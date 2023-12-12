import React from 'react'
import {Instance, InstanceToken} from './Instance'
import { User } from '../interface/User'

export const createOrder = () =>{
   return  InstanceToken.post('/order')
}
export const getOrder = () =>{
   return  InstanceToken.get('/order')
}
