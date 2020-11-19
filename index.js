const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(persons)
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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(!person){
        response.status(404).end()
    }else{
        response.json(person)
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
  }

app.post('/api/persons', (request, response) => {
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

})


PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})
