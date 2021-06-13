const Project = require('../projects/projects-model')
const Action = require('../actions/actions-model')

function logger(req, res, next) {
    // console.log(`${req.method}, ${req.url}, ${req.timestamp}`)
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.url
    console.log(`[${timestamp}], ${method}, ${url}`)
    next()
}

async function validateProjectId(req, res, next) {

    // console.log('works')
    try {
        const project = await Project.getById(req.params.id)
        if (!project) {
            next({ status: 404, message: 'project not found' })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'server error finding project',
        })
    }
}

function validateProject(req, res, next) {

    const { name } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({
            message: 'missing required name field'
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required descripton field'
        })
    } else {
        req.name = name.trim()
        req.descripton = description.trim()
        next()
    }
}

function validateAction(req, res, next) {

    const { project_id } = req.body;
    const { description } = req.body;
    const { notes } = req.body;

    if (!project_id) {
        res.status(400).json({
            message: 'you must supply the id of an existing project',
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'missing required description field'
        })
    } else if (!notes || !notes.trim()) {
        res.status(400).json({
            message: 'missing required notes field'
        })
    } else {
        req.description = description.trim()
        req.notes = notes.trim()
        next()
    }
}

// expose these functions to other modules
module.exports = {
    logger,
    validateProjectId,
    validateProject,
    validateAction
}