import axios from 'axios'

const token = localStorage.getItem('AccessToken')

export const Instance = axios.create({
    baseURL:`https://ecomerce-server-uztg.onrender.com/api`
})
export const InstanceToken = axios.create({
    baseURL:`https://ecomerce-server-uztg.onrender.com/api`,
    headers: {Authorization: `Bearer ${token}`}

})

