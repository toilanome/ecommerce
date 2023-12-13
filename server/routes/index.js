import routerUser from './user.js';
import { Router } from 'express';
import routerPoduct from './product.js';
import routerOrder from './order.js';
const routerInit = Router();

routerInit.use('/user', routerUser )
routerInit.use('/products', routerPoduct )
routerInit.use('/order', routerOrder )

export default routerInit;  