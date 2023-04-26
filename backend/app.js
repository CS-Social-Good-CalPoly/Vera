const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()
const PORT = 3001
const DB_CONNECTION = process.env.DB_CONNECTION

app.use(cors({ origin: 'http://localhost:3000' }));

const resourceRoutes = require('./routes/resources')
const storyRoutes = require('./routes/stories')

// Middleware || routes
app.use(bodyparser.json())
app.use(express.json())

// a link to seperated routes
app.use('/resources', resourceRoutes)
app.use('/stories', storyRoutes)

// home page route
app.get('/', (req, res) => {
    res.send('This is our home url!')
})

mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
            console.log('MongoDB connected 😄')
        }
    ).catch(() => {
        console.log('DB connection failed')
    }
)

// start the server via npm start
app.listen(PORT, () => console.log('Server started'))
