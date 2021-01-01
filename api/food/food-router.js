const express = require('express');

const Food = require('./food-model.js')

const router = express.Router()

router.get('/', (req, res) => {
    Food.find()
        .then(food => {
            res.json(food)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed!'})
        })
})

router.get('/:name', (req, res) => {
    const { name } = req.params

    Food.findByName(name)
        .then(food => {
        if (food){
            res.json(food);
            } else {
                res.status(404).json({ message: "Can't find food by that item." })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "DB Error" });
        })
})

router.post('/', (req, res) => {
    const newFood = req.body

    Food.add(newFood)
        .then(food => {
            res.status(201).json({ message: "Your item as been added."});
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to add your item. Check to see if it already exists`})
        })
})


module.exports = router;