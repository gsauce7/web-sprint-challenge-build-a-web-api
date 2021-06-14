// Write your "actions" router here!
const express = require('express');
const router = express.Router();

// import the Actions Model
const Action = require('./actions-model');
// import middlewares
const { validateActionId, validateAction } = require('../middleware/middleware.js');


router.get('/', (req, res, next) => {
    // returns the actions as the body of the response. If no actions it responds with empty array.
    Action.get()
        .then(returnedActions => {
            res.json(returnedActions)
        })
        .catch(next)
});


router.get('/:id', validateActionId, async (req, res, next) => {
    // Returns an action with the given id as the body of the response. If no action found with the id, it responds with status code 404.
    try {
        const result = await Action.get(req.params.id);
        const trueResult = { project_id: result.project_id, description: result.description, notes: result.notes, completed: result.completed }
        res.status(200).json(trueResult)
    }

    catch { (next) }
});



router.post('/', validateAction, (req, res, next) => {
    // RETURN THE NEWLY CREATED PROJECT OBJECT
    // middleware `validateAction` is used to check that the request body is valid
    const newAction = req.body;
    // Project.insert({ name: req.name, description: req.description })
    Action.insert(newAction)
        .then(result => {
            // throw new Error('error thrown!')
            res.status(201).json(result)
        })
        .catch(next)

});

// router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
//     // RETURN THE FRESHLY UPDATED ACTION OBJECT
//     // uses middleware to check id and another middleware to check that the request body is valid
//     const id = req.params.id;
//     const changes = req.body;
//     if (changes === []) {
//         res.status(400).json({ message: 'missing all fields' })
//     }
//     else {

//         try {
//             const update = await Action.update(id, changes)

//             res.status(200).json(update)
//         }

//         catch { (next) }
//     }


// });

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    // RETURN THE FRESHLY UPDATED ACTION OBJECT
    // uses middleware to check id and another middleware to check that the request body is valid

    const id = req.params.id;
    const changes = req.body;

    Action.update(id, changes)
        .then(() => {
            return Action.get(id)
        })
        .then(result => {
            res.json(result)
        })
        .catch(next)


});


router.delete('/:id', validateActionId, (req, res, next) => {


    Action.remove(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
});

// router.get('/:id/actions', validateProjectId, async (req, res, next) => {
//     // RETURN THE ARRAY OF ACTIONS ASSOCIATED WITH THE PROJECT ID

//     try {
//         const actionArray = await Project.getProjectActions(req.params.id)
//         res.json(actionArray)
//     } catch (err) {
//         next(err)
//     }
// });

// error handling middleware
router.use((err, req, res, next) => { // eslint - disable - line
    res.status(err.status || 500).json({
        customMessage: 'something horrible happened inside actions router',
        message: err.message,
        stack: err.stack
    })
})

// export the router
module.exports = router