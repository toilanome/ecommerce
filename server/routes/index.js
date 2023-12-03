import routerUser from './user.js';
import { Router } from 'express';
import routerPoduct from './product.js';
const routerInit = Router();

routerInit.use('/user', routerUser )
routerInit.use('/products', routerPoduct )

export default routerInit;