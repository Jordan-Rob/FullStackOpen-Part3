require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan('tiny'))

let persons = [
    {
        id:1, 
        name: "Arto Hellas",
        number:"040-123456"
     
    },
    {
        id:2, 
        name: "Ada Lovelace",
        number:"39-44-5323523"
     
    },
    {
        id:3, 
        name: "Dan Abramov",
        number:"12-43-234345"
     
    },
    {
        id:4, 
        name: "Mary Poppendick",
        number:"39-23-6423122"
     
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then( persons => {
        response.json(persons)
    })

})

app.get('/info', (request, response) => {
    const num = persons.length
    const tim = Date()
    console.log(tim)
    response.send(
        `<p>Phonebook has info for ${num} people</p>
        <p>${tim}</p>
        `
    )
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
     .then( person => {
        response.json(person)
    })
     .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response) => {
    /*
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
    */
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
  }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    /*
    if(body.name === undefined || body.number === undefined){
        return response.status(400).json({
            error:'name or number is missing'
        })}

    Person.find({ name:body.name })
    .then( response => {
        response.status(400).json({
            error:'name already exists'
        })
    })    
    */
    const person = new Person({
        name: body.name,
        number:body.number
    })

    person.save().then( p => {
        return p.toJSON()
    }).then( pFormatted => {
        response.json(pFormatted)
    }).catch( error => next(error))

    
    /*
    let minn = Number(persons.length)
    let found = persons.find(p => p.name === request.body.name)

    if(!request.body.name || !request.body.number ){
        response.status(400)
        .json({ error: "name or number has not been entered"})
    }else if(found){
        response.status(400)
        .json({ error: "person with name already exists"})
    }else {
        const person = {
            id: getRandomInt(minn, 20),
            name: request.body.name,
            number: request.body.number
        }
    
        console.log(person.id)
        persons = persons.concat(person)
        response.json(person)
    }
    */

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
     .then(updatedPerson => {
         response.json(updatedPerson)
     })
     .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)



const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }else if ( error.name === 'ValidationError'){
        return response.status(400).send({ error: 'enter a unique name & 10 digit Number'})
    }
  
    next(error)
  }
  
  app.use(errorHandler)


PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})
