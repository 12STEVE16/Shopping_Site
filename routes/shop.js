
import express from 'express';
import bodyParser from 'body-parser';
import * as shopController from '../controllers/shop.js';
const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.set('view engine', 'ejs');
router.set('views', './views');


router.get("/",shopController.getIndex);
router.get("/products",shopController.getProducts);
router.get("/cart",shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteItem);
router.get("/orders",shopController.getOrders);
router.get("/checkout",shopController.getcheckout);
router.get("/products/:productId",shopController.getProduct);
export { router };