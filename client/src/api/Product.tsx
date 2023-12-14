import { IProduct } from "../interface/User"
import {Instance, InstanceToken} from "./Instance"

export const getAllProduct = () =>{
    return Instance.get('/products')
}
export const deleteProduct = (_id:number | string) =>{
    return InstanceToken.delete('/products/' +_id)
}
export const getDetailProduct = (_id: number | string) =>{
    return Instance.get('/' + _id)
}
export const CreateProduct = (product : IProduct) =>{
    return InstanceToken.post('/products/createProduct', product)
}
export const updateProduct = (product : IProduct) =>{
    console.log('Updating product with ID:', product._id);
    return InstanceToken.put('/products/' + product._id)
}

export const getDetailCategory = (_id : IProduct) =>{
    return Instance.get('/category/detail/' + _id)
}
export const getAllCategory = () =>{
    return Instance.get('/category/allCategory')
}