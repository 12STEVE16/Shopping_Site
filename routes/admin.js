import express from 'express';
import bodyParser from 'body-parser';
import * as adminController from '../controllers/admin.js';

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.set('view engine', 'ejs');
router.set('views', './views');

// Admin routes


router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);


router.post('/add-product',adminController.postAddProduct);

router.get('/edit-product/:productId',adminController.getEditProduct)

router.post('/edit-product',adminController.postEditProduct)
router.post('/delete-product',adminController.postDeleteProduct)
export { router};



