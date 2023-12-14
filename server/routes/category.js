
import { Router } from 'express';
import { isAdmin, verifyAccessToken } from '../middleware/verifyToken.js';
import { createCategory, deleteCategory, getAllCategories, getDetailCategories, updateCategory } from '../controllers/categories.js';

const routerCategory = Router();

routerCategory.post('/',verifyAccessToken, createCategory)
routerCategory.get('/allCategory', getAllCategories)
routerCategory.get('/detail/:id', getDetailCategories)
routerCategory.put('/updateCategory',verifyAccessToken, updateCategory)
routerCategory.delete('/deleteCategory/:id',verifyAccessToken,isAdmin, deleteCategory)





export default routerCategory