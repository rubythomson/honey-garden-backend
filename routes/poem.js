const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Poem = require('./../models/Poem')
const path = require('path')

// GET- get all poems -------------------------------------------------------------------------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Poem.find().populate('user', '_id userName')
    .then(poems => {
      if(poems == null){
        return res.status(404).json({
          message: "No poems found"
        })
      }
      res.json(poems)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting poems"
      })
    })  
})

// POST - create new poem --------------------------------------------------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Post content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new post
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new poem
    let newPoem = new Poem({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.body.user,
      image: uniqueFilename,
      mature: req.body.mature
    })
  
    newPoem.save()
    .then(poem => {        
      // success!  
      // return 201 status with post object
      return res.status(201).json(poem)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating post",
        error: err
      })
    })
  })
})

// export
module.exports = router