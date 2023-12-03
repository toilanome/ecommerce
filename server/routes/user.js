import { deleteUser, forgotPassword, getAllUser, getUserDetail, login, logout, refreshToken, register, resetPassword, updateUser, updateUserById } from '../controllers/user.js';
import { Router } from 'express';
import { isAdmin, verifyAccessToken } from '../middleware/verifyToken.js';
const routerUser = Router();

routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.get('/',verifyAccessToken, isAdmin, getAllUser)
routerUser.get('/userDetail',verifyAccessToken, getUserDetail)
routerUser.put('/updateUser',verifyAccessToken, updateUser)
routerUser.put('/:id',verifyAccessToken,isAdmin, updateUserById)
routerUser.get('/refreshToken', refreshToken)
routerUser.get('/forgotPassword', forgotPassword)
routerUser.put('/resetPassword', resetPassword)
routerUser.get('/logout', logout)
routerUser.delete('/:id',verifyAccessToken, isAdmin, deleteUser)

export default routerUser