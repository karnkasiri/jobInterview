const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const api = require('./src/api/index')

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/api', api)

// Start the server
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
});
