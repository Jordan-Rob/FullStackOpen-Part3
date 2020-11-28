const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url = `mongodb+srv://fso:${password}@cluster0.hycmv.mongodb.net/phonebookdb?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = mongoose.Schema({
    name:String,
    phone:String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){

    const person = new Person({
        name:name,
        phone:phone
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.phone} to phonebook`)
        mongoose.connection.close()
    })
}else if (process.argv.length === 3){

    Person.find({}).then(result => {
        console.log('phonebook: ')
        result.forEach( p => {
            console.log(`\n${p.name} ${p.phone}`)
        })
        mongoose.connection.close()
    })

}else{
    console.log('Please provide password as a 3rd argument in  node mongo.js <password> or password, name, phone as 3rd 4th and 5th \narguments in command: node mongo.js <password> <name> <phone> inorder to add a person')
    process.exit(1)
}