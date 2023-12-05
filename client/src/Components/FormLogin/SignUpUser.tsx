import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/User'
import { User } from '../../interface/User'
import {toast} from 'react-toastify'
const SignUpUser = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] =useState({})
    
    const mutationAccount = useMutation({
        mutationFn: (user : User ) => register(user),
        onSuccess() {
            toast.success("Đăng Ký Thành Công =))))")
            navigate('/signin')

        },
        onError(){
            toast.error("Đăng ký thất bại, kiểm tra lại thông tin ")
        }
        
    })

    const onChange = (e:any) =>{
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]:value
        })
    }
    

    const onSubmit = (e:any) =>{
        e.preventDefault()
        mutationAccount.mutate(inputValue as User )
    }

  return (
    <>
       <div className="flex flex-col h-screen bg-gray-100">
    <div className="grid place-items-center mx-2 my-20 sm:my-auto">
       
    
    
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                SignUp
            </h2>

            <form className="mt-10" onSubmit={onSubmit}>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase">Name</label>
                <input id="name" type="text" name="name" placeholder="Name User" autoComplete="name"
                    className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    onChange={onChange} 
                    
                    required />

                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                <input id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                    className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    onChange={onChange} 

                    required />

                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input id="password" type="password" name="password" placeholder="password" autoComplete="current-password"
                    className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    onChange={onChange} 

                    required />

            <label htmlFor="mobile" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Mobile</label>
                <input id="mobile" type="text" name="mobile" placeholder="mobile" autoComplete="current-mobile"
                    className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    onChange={onChange} 

                    required />

        

                <button type="submit"
                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                    SignUp
                </button>

                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                   

                    <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                        Have Account ?  
                        <Link to={'/signin'} className="flex-2 underline">
                         Login
                    </Link>
                    </p>
        
                    
                </div>
            </form>
        </div>
    </div>
</div>
    </>
  )
}

export default SignUpUser