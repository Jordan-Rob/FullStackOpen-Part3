const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to Mongodb')
    })
    .catch(error => {
        console.log('error connecting to mongodb:', error.messge)
    })

const personSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        unique: true,
        required: true
    },
    number:{
        type:String,
        minlength: 10,
        required: true
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)