import routerUser from './user.js';
import { Router } from 'express';
import routerPoduct from './product.js';
import routerOrder from './order.js';
import routerCategory from './category.js';
const routerInit = Router();

routerInit.use('/user', routerUser )
routerInit.use('/products', routerPoduct )
routerInit.use('/order', routerOrder )
routerInit.use('/category', routerCategory )

export default routerInit;  