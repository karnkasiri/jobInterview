const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    const userCreate = await prisma.user.create({
        data: {
            username: 'exampleUser',
            password: 'examplePassword',
            email: 'user@example.com'
        }
    })
    const user = await prisma.user.findMany()
    console.log('user:>>', user)
});
