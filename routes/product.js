const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authenticator');
const upload = require('../middlewares/multer');
const productController = require('../controllers/product');

router.post('/', authenticateJWT, upload.single('productImage'), productController.create);


module.exports = router;