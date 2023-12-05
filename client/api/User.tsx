import instance from "./instance"


 export const Register = (user:any) =>{
    return instance.post('/user/register', user)
}
