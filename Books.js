const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    release: Date,
    pages: Number
})

module.exports = mongoose.model("Book", bookSchema)