const express = require('express')
const authCheck = require('../middleware/auth-check');
const Game = require('../models/Game');

const router = new express.Router()

function validateGameForm(payload) {
    const errors = {}
    let isFormValid = true
    let message = ''

    payload.year = parseInt(payload.year)
    payload.price = parseInt(payload.price)

    if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
        isFormValid = false
        errors.name = 'Name must be more than 3 symbols.'
    }

    if (!payload || typeof payload.category !== 'string' || payload.category.length < 3) {
        isFormValid = false
        errors.category = 'Category must be more than 3 symbols.'
    }

    if (!payload || !payload.year || payload.year < 1950 || payload.year > 2050) {
        isFormValid = false
        errors.year = 'Year must be between 1950 and 2050.'
    }

    if (!payload || typeof payload.description !== 'string' || payload.description.length < 10) {
        isFormValid = false
        errors.description = 'Description must be more than 10 symbols.'
    }

    if (!payload || !payload.price || payload.price < 0) {
        isFormValid = false
        errors.price = 'Price must be a positive number.'
    }

    if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
        isFormValid = false
        errors.image = 'Image URL is required.'
    }

    if (!isFormValid) {
        message = 'Check the form for errors.'
    }

    return {
        success: isFormValid,
        message,
        errors
    }
}

router.post('/create', authCheck, (req, res) => {
    const game = req.body
    game.creator = req.user._id
    const validationResult = validateGameForm(game)
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    Game.create(game)
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Game added successfully.',
                furniture: game
            })
        })
})

router.get('/all', authCheck, (req, res) => {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search

    Game.find({})
        .then((furniture) => {
            return res.status(200).json(furniture)
        })
})

router.get('/details/:id', authCheck, (req, res) => {
    const id = req.params.id
    Game.findById(id)
        .then((game) => {
            if (!game) {
                return res.status(404).json({
                    success: false,
                    message: 'Entry does not exists!'
                })
            }

            let response = {
                id,
                name: game.name,
                category: game.category,
                year: game.year,
                description: game.description,
                price: game.price,
                image: game.image,
            }

            if (game.material) {
                response.manufacturer = game.material
            }

            res.status(200).json(response)
        })
})


router.get('/user', authCheck, (req, res) => {
    const user = req.user._id

    Game.find({creator: user})
        .then((game) => {
            return res.status(200).json(game)
        })
})

router.delete('/delete/:id', authCheck, (req, res) => {
    const id = req.params.id
    const user = req.user._id

    Game.findById(id)
        .then((game) => {
            if (!game) {
                return res.status(200).json({
                    success: false,
                    message: 'Game does not exists!'
                })
            }

            if ((game.creator.toString() !== user && !req.user.roles.includes("Admin"))) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized!'
                })
            }

            Game.findByIdAndDelete(id)
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        message: 'Game deleted successfully!'
                    })
                })
        })
})

router.put('/edit/:id', authCheck, (req, res) => {
    const id = req.params.id;
    const game = req.body;

    if (!game) {
        return res.status(404).json({
            success: false,
            message: 'Game does not exists!'
        })
    }

    /*Автентикация за админ*/
    /*  if (!req.user.roles.includes('Admin')) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized!'
        })
      }*/

    const validationResult = validateGameForm(game)
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    Game.findByIdAndUpdate(id, game)
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'Game edited successfully!'
            })
        })
})

router.get('/:id', authCheck, (req, res) => {
    const id = req.params.id

    Game.findById(id)
        .then(game => {
            if (!game) {
                return res.status(404).json({
                    success: false,
                    message: 'Entry does not exists!'
                })
            }

            let response = {
                id,
                name: game.name,
                category: game.category,
                year: game.year,
                description: game.description,
                price: game.price,
                image: game.image
            }

            if (game.manufacturer) {
                response.manufacturer = game.manufacturer
            }

            res.status(200).json(response)
        });
});

module.exports = router
