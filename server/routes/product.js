
import { Router } from 'express';
import { isAdmin, verifyAccessToken } from '../middleware/verifyToken.js';
import {  createProduct, deleteProduct, getAllProduct, getDetailProduct, updateProduct } from '../controllers/products.js';
const routerPoduct = Router();

routerPoduct.post('/createProduct',verifyAccessToken, isAdmin, createProduct)
routerPoduct.get('/',verifyAccessToken,isAdmin, getAllProduct)
routerPoduct.get('/:id', getDetailProduct)
routerPoduct.delete('/:id',verifyAccessToken, isAdmin, deleteProduct)
routerPoduct.put('/:id',verifyAccessToken, isAdmin, updateProduct)





export default routerPoduct