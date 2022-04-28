const {Router} = require('express')
const router = Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/auth')

router.get('/', postController.getAll)
router.post('/create', postController.create)
router.post('/edit', authMiddleware.isAuth, postController.create)

module.exports = router