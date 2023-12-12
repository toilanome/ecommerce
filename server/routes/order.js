
import { Router } from 'express';
import { isAdmin, verifyAccessToken } from '../middleware/verifyToken.js';
import { createOrder, getOrder } from '../controllers/order.js';
const routerOrder = Router();

routerOrder.post('/',verifyAccessToken, createOrder)
routerOrder.get('/',verifyAccessToken, getOrder)






export default routerOrder