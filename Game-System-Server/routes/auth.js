const express = require('express')
const passport = require('passport')
const validator = require('validator')
const authCheck = require("../middleware/auth-check");
const User = require("../models/User");
const Game = require("../models/Game");

const router = new express.Router()

function validateSignupForm(payload) {
    const errors = {}
    let isFormValid = true
    let message = ''

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false
        errors.email = 'Please provide a correct email address.'
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
        isFormValid = false
        errors.password = 'Password must have at least 4 characters.'
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false
        errors.name = 'Please provide your name.'
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

function validateLoginForm(payload) {
    const errors = {}
    let isFormValid = true
    let message = ''

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false
        errors.email = 'Please provide your email address.'
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false
        errors.password = 'Please provide your password.'
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

router.put('/edit/:id', authCheck, (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User does not exists!'
        })
    }

      if (!req.user.roles.includes('Admin')) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized!'
        })
      }

  /*  const validationResult = validateGameForm(game)
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }*/

    User.findByIdAndUpdate(id, user)
        .then(() => {
            return res.status(200).json({
                success: true,
                message: 'User edited successfully!'
            })
        })
})

router.delete('/delete/:id', authCheck, (req, res) => {
    const id = req.params.id

    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'User does not exists!'
                })
            }

            if (!req.user.roles.includes("Admin")) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized!'
                })
            }

            User.findByIdAndDelete(id)
                .then(() => {
                    console.log(id);
                    return res.status(200).json({
                        success: true,
                        message: 'User deleted successfully!'
                    })
                })
        })
});

router.get('/all', authCheck, (req, res) => {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search

    User.find({})
        .then((user) => {
            return res.status(200).json(user)
        })
});

router.post('/register', (req, res, next) => {
    const validationResult = validateSignupForm(req.body)
    if (!validationResult.success) {
        return res.status(401).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    return passport.authenticate('local-signup', (err) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: err
            })
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        })
    })(req, res, next)
})

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body)
    if (!validationResult.success) {
        return res.status(401).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                console.log('Invalid credentials');
                return res.status(401).json({
                    success: false,
                    message: err.message
                })
            }

            return res.status(401).json({
                success: false,
                message: 'Could not process the form.'
            })
        }

        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        })
    })(req, res, next)
});

module.exports = router
