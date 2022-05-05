const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

let persons=[
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
]

app.use(express.json())
app.use(cors())
morgan.token('postBody', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people </>  
        <p>${new Date()} </> 
    `)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    min = Math.ceil(0);
    max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
const body = request.body
console.log( request.body )
if (!body.name || !body.number) {
    return response.status(400).json({ 
    error: 'No name or number' 
    })
}
if (persons.find(person => person.name === body.name)){
    return response.status(400).json({ error: 'name must be unique' })
}
const person = {
    id: generateId(),
    name: body.name,
    number: body.number
}
persons = persons.concat(person)

response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})