// Write your "projects" router here!
const express = require('express');
const router = express.Router();

// import the Projects Model
const Project = require('./projects-model');
// const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware.js');


router.get('/', (req, res, next) => {
    // get all the Projects from the database - returns an array
    Project.get()
        .then(users => {
            res.json(users)
        })
        .catch(next)
});


// router.get('/:id', validateUserId, (req, res) => {
//     // RETURN THE USER OBJECT
//     // this needs a middleware to verify user id

//     res.json(req.user)
// });

// router.post('/', validateUser, (req, res, next) => {
//     // RETURN THE NEWLY CREATED USER OBJECT
//     // this needs a middleware to check that the request body is valid
//     User.insert({ name: req.name })
//         .then(newUser => {
//             // throw new Error('error thrown!')
//             res.status(201).json(newUser)
//         })
//         .catch(next)

// });

// router.put('/:id', validateUserId, validateUser, (req, res, next) => {
//     // RETURN THE FRESHLY UPDATED USER OBJECT
//     // this needs a middleware to verify user id
//     // and another middleware to check that the request body is valid
//     User.update(req.params.id, { name: req.name })
//         .then(() => {
//             return User.getById(req.params.id)
//         })
//         .then(user => {
//             res.json(user)
//         })
//         .catch(next)
// });

// router.delete('/:id', validateUserId, async (req, res, next) => {
//     // RETURN THE FRESHLY DELETED USER OBJECT
//     // this needs a middleware to verify user id
//     try {
//         await User.remove(req.params.id)
//         res.json(req.user)
//     } catch (err) {
//         next(err)
//     }
// });

// router.get('/:id/posts', validateUserId, async (req, res, next) => {
//     // RETURN THE ARRAY OF USER POSTS
//     // this needs a middleware to verify user id
//     try {
//         const postArray = await User.getUserPosts(req.params.id)
//         res.json(postArray)
//     } catch (err) {
//         next(err)
//     }
// });

// router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
//     // RETURN THE NEWLY CREATED USER POST
//     // this needs a middleware to verify user id
//     // and another middleware to check that the request body is valid
//     try {

//         const newPost = await Post.insert({
//             user_id: req.params.id,
//             text: req.text,
//         })
//         res.status(201).json(newPost)
//     } catch (err) {
//         next(err)
//     }
// });

// error handling middleware
// router.use((err, req, res, next) => { // eslint - disable - line
//     res.status(err.status || 500).json({
//         customMessage: 'something horrible happened inside posts router',
//         message: err.message,
//         stack: err.stack
//     })
// })

// export the router
module.exports = router