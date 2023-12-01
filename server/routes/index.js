import routerUser from './user.js';
import { Router } from 'express';
import {notFound, errHandler} from '../middleware/errorHandler.js'
const routerInit = Router();

routerInit.use('/user', routerUser )

export default routerInit;