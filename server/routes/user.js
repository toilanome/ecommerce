import { deleteUser, forgotPassword, getAllUser, getUserDetail, login, logout, refreshToken, register, resetPassword } from '../controllers/user.js';
import { Router } from 'express';
import { verifyAccessToken } from '../middleware/verifyToken.js';
const routerUser = Router();

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.get('/', getAllUser)
routerUser.get('/userDetail',verifyAccessToken, getUserDetail)
routerUser.get('/refreshToken', refreshToken)
routerUser.get('/forgotPassword', forgotPassword)
routerUser.put('/resetPassword', resetPassword)
routerUser.get('/logout', logout)
routerUser.delete('/:id', deleteUser)

export default routerUser