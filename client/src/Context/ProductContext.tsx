import React, { createContext, useEffect, useState } from 'react'
import {useMutation,useQueryClient,useQuery} from 'react-query'
import { toast } from 'react-toastify'
import { deleteProduct, getAllProduct } from '../api/Product'
import { IProduct } from '../interface/User'
import { deleteUser, getAllUser, getUserDetail } from '../api/User'

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
        }
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

    // const mutationGetAccount = useMutation({
    //     mutationFn : (_id:any) => getUserDetail(_id),
    //     onSuccess() {
    //         queryClient.invalidateQueries({
    //             queryKey:['PRODUCTS']
    //         })
    //     }
    // })

    // const {data :userInfo} = useQuery({
    //     queryKey: ['INFO'],
    //     queryFn: async(_id : any) =>{
    //         try {
    //             const {data} = await getUserDetail(_id)
    //             console.log("Info",data);
    //             return data as IProduct[]
                
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //             throw error;
    //         }
    //     }
    // })

    const ContextValue = {products, isError,isLoading, mutationDelete, user,mutationDeleteUser}
  return (
    <ProductShopContext.Provider value={ContextValue}>
        {children}
    </ProductShopContext.Provider>
  )
}

export default ProductContext