const LocalStrategy = require('passport-local').Strategy
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
const { comparePassword } = require('../service/bcrypt.service')

module.exports = function (app, passport) {
  const secretKey = 'uwqXMX6mdG'
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

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
        username: user.username,
        email: user.email,
        role: user.role,
        iat: new Date().getTime()
      }

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log(err)
          return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('decoded:>>>', decoded)
      })
      res.status(200).json({ token })
    })(req, res)
  })
}

