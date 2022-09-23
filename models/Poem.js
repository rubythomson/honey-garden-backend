const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const poemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  pages: {
    type: Number,
    required: true,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  image: {
    type: String,
    required: true    
  },
}, { timestamps: true })


// model
const poemModel = mongoose.model('Poem', poemSchema)

// export
module.exports = poemModel