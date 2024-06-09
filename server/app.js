const express = require('express')
const { generateQuestions } = require('./openai.js')

// app setup
const app = express()
app.listen(4000, () => console.log('listening to requests on port 4000'))

// middleware - allow us to extract JSON data from POST request
app.use(express.json())

// routes
app.post('/openai/questions', generateQuestions)
