// Write your "projects" router here!
const express = require('express');
const router = express.Router();

// import the Projects Model
const Project = require('./projects-model');
// import middlewares
const { logger, validateProjectId, validateProject, validateAction } = require('../middleware/middleware.js');


router.get('/', (req, res, next) => {
    // Returns an array of projects as the body of the response. If no projects it responds with empty array.
    Project.get()
        .then(returnedProjects => {
            res.json(returnedProjects)
        })
        .catch(next)
});


router.get('/:id', validateProjectId, (req, res) => {
    // Returns a project with the given id as the body of the response. If no project found with the id, it responds with status code 404.
    Project.get(req.params.id)
        .then(returnedProject => {
            res.json(returnedProject)
        })
        .catch(next)

});

router.post('/', validateProject, (req, res, next) => {
    // RETURN THE NEWLY CREATED PROJECT OBJECT
    // middleware `validateProject` is used to check that the request body is valid
    const newProject = req.body;
    // Project.insert({ name: req.name, description: req.description })
    Project.insert(newProject)
        .then(newProject => {
            // throw new Error('error thrown!')
            res.status(201).json(newProject)
        })
        .catch(next)

});

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