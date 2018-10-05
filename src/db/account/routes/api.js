const express = require('express');
const service = require('../service');

const router = express.Router();

router.get('/', (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    return service.index({}, page, limit)
        .then(data => res.status(200).json(data))
        .catch(e => res.status(e.status));
});

router.post('/', (req, res) => {
    const {
        username,
        email,
        password,
    } = req.body;
    return service.create({
        username,
        email,
        password,
    })
        .then(data => res.json(data))
        .catch(e => res.status(e.status));
});

router.delete('/', (req, res) => service.destroy()
    .then(data => res.status(204).json(data))
    .catch(e => res.status(e.status)));

router.get('/:_id', (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        return res.status(400);
    }
    return service.getOne(_id)
        .then(data => res.status(200).json(data))
        .catch(e => res.status(e.status));
});

router.put('/:_id', (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        return res.status(400);
    }

    const {
        username,
        email,
        password,
    } = req.body;

    return service.update(_id, {
        username,
        email,
        password,
    })
        .then(data => res.status(200).json(data))
        .catch(e => res.status(e.status));
});

router.delete('/:_id', (req, res) => {
    const { _id } = req.params;
    return service.delete(_id)
        .then(data => res.status(204).json(data))
        .catch(e => res.status(e.status));
});

module.exports = router;
