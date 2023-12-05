import axios from 'axios'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { register } from '../../api/User'
import { User } from '../../interface/User'

// import User from './User'

const SignUp = () => {
    const [inputValue, setInputValue] =useState({})
    
    const mutationAccount = useMutation({
        mutationFn: (user : User ) => register(user),
        // mutationFn: (user:User) => register(user),
        onSuccess() {
            alert("đăng kí thành công")

        },
        onError(){
            throw new Error("Đăng ký thất bại, kiểm tra lại thông tin ")
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
    <div className="w-full h-auto overflow-scroll block  p-4 flex items-center justify-center " >
    <div className="bg-white py-6 px-10 sm:max-w-md w-full " style={{boxShadow: "2px 2px 34px 15px rgb(245 237 239)"}}>
        <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
            Registration Form 
        </div>
        <form onSubmit={onSubmit}>
        <div className="">
            <div>
                 <input type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"  placeholder="Name " onChange={onChange} name='name'/>
            </div>
             <div>
                 <input type="email" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8"  placeholder="Email Adress " onChange={onChange} name='email'/>
            </div>
            
             <div>
            <input type="phone" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"  placeholder="Phone " onChange={onChange} name='mobile'/>
            </div>
            <div className="">
                <input type="password" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"  placeholder="Password "onChange={onChange} name='password' />
            </div>
            <div className="flex">
                <input type="checkbox" className="border-sky-400 " value="" />
                <div className="px-3 text-gray-500">
                    I accept terms & conditions 
                </div>
            </div>
            <div className="flex justify-center my-6">
                <button className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold " >
                    Create Account
                </button>
            </div>
            <div className="flex justify-center ">
                <p className="text-gray-500">Already have an acount? </p>
                <a href="" className="text-sky-600 pl-2"> Sign In</a>
            </div>
        </div>
        </form>
        
    </div>
</div>
    </>
  )
}

export default SignUp