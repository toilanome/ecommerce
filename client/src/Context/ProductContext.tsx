import React, { createContext, useEffect, useState } from 'react'
import {useMutation,useQueryClient,useQuery} from 'react-query'
import { toast } from 'react-toastify'
import { deleteProduct, getAllProduct, getDetailProduct } from '../api/Product'
import { IProduct } from '../interface/User'
import { deleteProductCart, deleteUser, getAllUser, getUserDetail } from '../api/User'
import { getOrder } from '../api/Order'

export const ProductShopContext = createContext({} as any)

const ProductContext = ({children} : {children : React.ReactNode}) => {

    const queryClient = useQueryClient();

    const {data :products , isLoading, isError} = useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async() =>{
            try {
                const {data} = await getAllProduct()
                console.log("data",data);
                return data as IProduct[]
                
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        }
    })

    const {data :bill } = useQuery({
        queryKey: ['BILL'],
        queryFn: async() =>{
            try {
                const {data} = await getOrder()
                console.log("data",data);
                return data 
                
            } catch (error) {
                console.error('Error fetching list Bill:', error);
                throw error;
            }
        }
    })
     




    const {data :user} = useQuery({
        queryKey: ['USER'],
        queryFn: async() =>{
            try {
                const {data} = await getAllUser()
                console.log("data",data);
                return data as IProduct[]
                
            } catch (error) {
                console.error('Error fetching products:', error);
                throw error;
            }
        },
        retry: 0
    })
    

    const mutationDeleteUser = useMutation({
        
        mutationFn : (_id:any) => deleteUser(_id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['USER']
            })
        }
    })


    const mutationDelete = useMutation({
        mutationFn : (_id:any) => deleteProduct(_id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['PRODUCTS']
            })
        }
    })

    const mutationGetProduct = useMutation({
        mutationFn : (_id:any) => getDetailProduct(_id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey:['PRODUCTS']
            })
        }
    })


    const {data :userDetail} = useQuery({
        queryKey:['UserDetail'],
        queryFn: async () =>{
            const token = localStorage.getItem('AccessToken');
            if(!token) throw new Error("token invalid")
    
            try {
                const response = await getUserDetail()
                console.log('user detail ', response.data);
                
                return response.data
            } catch (error) {
                throw new Error("fetch user failde")
            }
        }
    })


    const ContextValue = {products, isError,isLoading, mutationDelete, user,mutationDeleteUser,mutationGetProduct,userDetail, bill}
  return (
    <ProductShopContext.Provider value={ContextValue}>
        {children}
    </ProductShopContext.Provider>
  )
}

export default ProductContext