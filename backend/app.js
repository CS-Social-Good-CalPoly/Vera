const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 3001
const DB_CONNECTION = process.env.DB_CONNECTION

// Allow localhost to make requests to the backend
app.use(cors({ origin: 'http://localhost:3000' }))

// Allow main and preview netlify URLs to make requests to the backend
const allowNetlify = /https:\/\/.*calpolyvera\.netlify\.app.*/
app.use(cors({ origin: allowNetlify }))

const resourceRoutes = require('./routes/resources')
const storyRoutes = require('./routes/stories')

// Middleware || routes
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

// a link to seperated routes
app.use('/resources', resourceRoutes)
app.use('/stories', storyRoutes)

// home page route
app.get('/', (req, res) => {
    res.send('This is our home url!')
})

mongoose
    .connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected 😄')
    })
    .catch(() => {
        console.log('DB connection failed')
    })

// start the server via npm start
app.listen(PORT, () => console.log('Server started'))
