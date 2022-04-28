const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')

router.post('/sign-in', authController.signIn)

module.exports = router