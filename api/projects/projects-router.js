// Write your "projects" router here!
const express = require('express');
const router = express.Router();

// import the Projects Model
const Project = require('./projects-model');
// import middlewares
const { validateProjectId, validateProject, validateAction } = require('../middleware/middleware.js');


router.get('/', (req, res, next) => {
    // Returns an array of projects as the body of the response. If no projects it responds with empty array.
    Project.get()
        .then(returnedProjects => {
            res.json(returnedProjects)
        })
        .catch(next)
});


router.get('/:id', validateProjectId, (req, res, next) => {
    // Returns a project with the given id as the body of the response. If no project found with the id, it responds with status code 404.

    Project.get(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)


});

router.post('/', validateProject, (req, res, next) => {
    // RETURN THE NEWLY CREATED PROJECT OBJECT
    // middleware `validateProject` is used to check that the request body is valid
    const newProject = req.body;
    // Project.insert({ name: req.name, description: req.description })
    Project.insert(newProject)
        .then(result => {
            // throw new Error('error thrown!')
            res.status(201).json(result)
        })
        .catch(next)

});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // uses middleware to check id and another middleware to check that the request body is valid
    const id = req.params.id;
    const changes = req.body;
    Project.update(id, changes)
        .then(() => {
            return Project.get(id)
        })
        .then(result => {
            res.json(result)
        })
        .catch(next)
});


router.delete('/:id', validateProjectId, async (req, res, next) => {


    try {
        await Project.remove(req.params.id)

    } catch (err) {
        next(err)
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    // RETURN THE ARRAY OF ACTIONS ASSOCIATED WITH THE PROJECT ID

    try {
        const actionArray = await Project.getProjectActions(req.params.id)
        res.json(actionArray)
    } catch (err) {
        next(err)
    }
});

// error handling middleware
router.use((err, req, res, next) => { // eslint - disable - line
    res.status(err.status || 500).json({
        customMessage: 'something horrible happened inside projects router',
        message: err.message,
        stack: err.stack
    })
})

// export the router
module.exports = router