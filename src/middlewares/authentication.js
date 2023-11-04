const LocalStrategy = require('passport-local').Strategy
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const {
  comparePassword,
  getSecretKey
} = require('../utils/utils')

module.exports = function (app, passport) {
  const secretKey = getSecretKey()
  passport.use(new LocalStrategy(
    {
      usernameField: 'usernameOrEmail',
      passwordField: 'password',
    },
    async (usernameOrEmail, password, done) => {
      try {

        const user = await prisma.user.findFirst({
          where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }
        })

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ))

  app.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err })
      }

      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' })
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        iat: new Date().getTime()
      }

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
      res.status(200).json({ token })
    })(req, res)
  })
}

