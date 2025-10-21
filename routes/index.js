import express from 'express';
import productRoutes from "./product.routes.js";
import cartRoutes  from './cart.routes.js';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

export default router;