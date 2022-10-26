const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')
require('mongoose-type-email')

// schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true    
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String    
  },
  bio: {
    type: String    
  },
  accessLevel: {
    type: Number,   
    required: true 
  },
  newUser: {
    type: Boolean,   
    default: true 
  },
  readingList: [
    {
      poem: { type: Schema.ObjectId, ref: 'Poem' },
      status: { type: String, default: "Ongoing", required: true }
    }
  ]
}, { timestamps: true })

// encrypt password field on save
userSchema.pre('save', function(next) {
  // check if password is present and is modifed  
  if( this.password && this.isModified() ){
      this.password = Utils.hashPassword(this.password);
  }
  next()
})

// model
const userModel = mongoose.model('User', userSchema)

// export
module.exports = userModel