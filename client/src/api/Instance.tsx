import React from 'react'
import axios from 'axios'

const token = localStorage.getItem('AccessToken')

export const Instance = axios.create({
    baseURL:`http://localhost:8080/api`
})
export const InstanceToken = axios.create({
    baseURL:`http://localhost:8080/api`,
    headers: {Authorization: `Bearer ${token}`}

})

