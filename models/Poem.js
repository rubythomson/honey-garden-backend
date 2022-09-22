const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const poemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  views: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
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
  status: {
    type: String,
    required: true
  }
  
}, { timestamps: true })


// model
const poemModel = mongoose.model('Poem', poemSchema)

// export
module.exports = poemModel