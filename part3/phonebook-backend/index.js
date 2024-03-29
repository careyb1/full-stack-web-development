const express = require('express')
const morgan = require('morgan')

morgan.token('entry', request => {
  if (request.entry){
    return request.entry
  }
  return ' '
} )

const assignEntry = (req, res, next) => {
  if (req.method === 'POST'){
    req.entry = JSON.stringify(req.body)
  }
  next()
}

const app = express()

app.use(express.json())
app.use(assignEntry)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :entry'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  const people = persons.length
  const time = new Date()
  response.send(
    `<div>
        <p>
            Phonebook has info for ${people} people
        </p>
        <p>
            ${time}
        </p>
    </div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id ===id)

  if (person){
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = max => Math.floor(Math.random() * max)
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(1000),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})