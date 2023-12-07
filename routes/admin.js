import express from 'express';
import bodyParser from 'body-parser';
import * as productsController from '../controllers/products.js';

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.set('view engine', 'ejs');
router.set('views', './views');

// Admin routes


router.get('/add-product', productsController.getAddProduct);
router.post('/add-product',productsController.postAddProduct);



export { router};



