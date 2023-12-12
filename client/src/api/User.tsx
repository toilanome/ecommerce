import React from 'react'
import {Instance, InstanceToken} from './Instance'
import { User } from '../interface/User'

export const register = (user: User) =>{
   return  Instance.post('/user/register', user)
}
export const login = (user: User) =>{
   return  Instance.post('/user/login', user)
}
export const logout = async () => {
   try {
     const refreshToken = localStorage.getItem('refreshToken');
 
     // Gửi request lên server để đăng xuất
     const response = await Instance.post('/user/logout', { refreshToken });
     
     console.log(response.data);
 
     // Xóa refresh token từ localStorage sau khi đăng xuất
     localStorage.removeItem('refreshToken');
   } catch (error) {
     console.error('Error logging out:', error);
   }
 };
export const getAllUser = () =>{
   return  InstanceToken.get('/user')
}
export const deleteUser = (_id:number|string) =>{
   return  InstanceToken.delete(`/user/${_id}`)
}
export const getUserDetail = async () => {
   return InstanceToken.get('/user/userDetail')
 };
 export const updateCart = async (payload:any) => {
   return InstanceToken.put('/user/updateCart', payload)
 };
 export const deleteProductCart = async (payload:any) => {
   return InstanceToken.put('/user/deleteCart', payload)
 };