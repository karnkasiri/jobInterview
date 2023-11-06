const express = require('express')
const passport = require('passport')

const app = express()

app.use(express.json());

app.use(passport.initialize())
require('./src/middlewares/authentication')(app, passport)

const api = require('./src/api/index')

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/api', api)

const port = process.env.PORT || 3000

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
});
