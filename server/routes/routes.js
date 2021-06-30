const { response } = require('express')
const express = require('express')
const router = express.Router()
// const signUpTemplateCopy = require('../models/signupschema')

// router.post('/signup', (request,response)=>{
//     const signedUpUser = new signUpTemplateCopy({
//         username: request.body.username,
//         email: request.body.email,
//         password: request.body.password
//     })
//     signedUpUser.save()
//     .then(data=>{
//         response.json(data)
//     })

//    .catch(error =>{
//        response.json(err)
//    })
// })


// router.post('/signin', (request,response)=>{
//     const signedInUser = new signUpTemplateCopy({
//         username: request.body.username,
//         email: request.body.email,
//         password: request.body.password
//     })
//     signedInUser.save()
//     .then(data=>{
//         response.json(data)
//     })

//    .catch(error =>{
//        response.json(err)
//    })
// })
module.exports = router