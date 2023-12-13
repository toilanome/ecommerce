import { InstanceToken} from './Instance'

export const createOrder = () =>{
   return  InstanceToken.post('/order')
}
export const getOrder = () =>{
   return  InstanceToken.get('/order')
}
