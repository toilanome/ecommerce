import { register } from '../controllers/user.js';
import { Router } from 'express';
const routerUser = Router();

routerUser.post('/register', register)

export default routerUser