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


PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})
