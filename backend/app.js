const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 3001
const DB_CONNECTION = process.env.DB_CONNECTION

const corsOptions = {
    origin: ['http://localhost:3000', /calpolyvera\.netlify\.app/],
}

app.use(cors(corsOptions))

const resourceRoutes = require('./routes/resources')
const storyRoutes = require('./routes/stories')
const web_scraping = require('./routes/web_scraping')
const colleges_scraper = require('./routes/colleges_scraper')
const tagsRoutes = require('./routes/tags')

// Middleware || routes
app.use(bodyparser.json())
app.use(express.json())

// a link to seperated routes
app.use('/resources', resourceRoutes)
app.use('/stories', storyRoutes)
app.use('/web_scraping', web_scraping)
app.use('/colleges_scraper', colleges_scraper)
app.use('/tags', tagsRoutes)

// home page route
app.get('/', (req, res) => {
    res.send('This is our home url!')
})

mongoose
    .connect(DB_CONNECTION)
    .then(() => {
        console.log('MongoDB connected 😄')
    })
    .catch(() => {
        console.log('DB connection failed')
    })

// start the server via npm start
app.listen(PORT, () => console.log('Server started'))
