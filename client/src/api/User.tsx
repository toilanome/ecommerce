import React from 'react'
import {Instance, InstanceToken} from './Instance'
import { User } from '../interface/User'

export const register = (user: User) =>{
   return  Instance.post('/user/register', user)
}
export const login = (user: User) =>{
   return  Instance.post('/user/login', user)
}
export const getAllUser = () =>{
   return  InstanceToken.get('/user')
}
export const deleteUser = (_id:number|string) =>{
   return  InstanceToken.delete(`/user/${_id}`)
}
export const getUserDetail = async () => {
   return InstanceToken.get('/user/userDetail')
 };