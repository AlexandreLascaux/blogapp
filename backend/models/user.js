const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

const userModel = mongoose.Schema({
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true},
    pseudo: {type: String, require:true, unique: true}
})

userModel.plugin(uniValid)

module.exports = mongoose.model('User', userModel)