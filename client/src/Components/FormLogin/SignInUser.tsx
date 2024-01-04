import  { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/User'
import {toast} from 'react-toastify'
import { User } from '../../interface/User'
import { useFormik } from 'formik'
interface FormErrors {
    email?: string;
    password?: string;
   
  }
const SignIpUser = () => {
    
   

    const mutationAccount = useMutation({
        mutationFn: (user:any) => login(user),
        onSuccess(response) {
            const { Accesstoken } = response.data;
            
            // Lưu token mới vào Local Storage
            localStorage.setItem('AccessToken', Accesstoken);
            toast.success("Đăng Nhập Thành Công =))))")
            
            window.location.href ='/'
            // Hiển thị thông báo đăng nhập thành công hoặc thực hiện các hành động khác
            
          },
        
        onError(error:any){
          toast.error("Đăng Nhập Thất Bại :((((((");
          console.error("Login error:", error);

        }
    })

    const formikValidate = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
  
      validate: (values :FormErrors) => {
        const errors : FormErrors = {};
  
        
        if (!values.email) {
          errors.email = "Bắt buộc phải nhập email";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Chưa nhập địa chỉ email";
        }
        if (!values.password) {
          errors.password = "Bắt buộc phải nhập password";
        } else if (values.password.length < 8) {
          errors.password = "Password phải lớn hơn 8 ký tự";
        }
        
  
        return errors;
      },
      onSubmit: (values) => mutationAccount.mutate(values),
    });

   
      
    
      
   


  return (
    <>
<div className="flex flex-col h-screen bg-gray-100">
    <div className="grid place-items-center mx-2 my-20 sm:my-auto">
       
    
    
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                Login
            </h2>
            
            <form className="mt-10" onSubmit={formikValidate.handleSubmit}>
            {formikValidate.touched.email && formikValidate.errors.email && (
          <div className="text-red-500">{formikValidate.errors.email}</div>
        )}
                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                <input id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                    className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    onChange={formikValidate.handleChange}
                    onBlur={formikValidate.handleBlur}
                  defaultValue={formikValidate.values.email}

                     />
{formikValidate.touched.password && formikValidate.errors.password && (
          <div className="text-red-500">{formikValidate.errors.password}</div>
        )}
                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input id="password" type="password" name="password" placeholder="password" autoComplete="current-password"
                    className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    onChange={formikValidate.handleChange}
                    onBlur={formikValidate.handleBlur}
                  defaultValue={formikValidate.values.password}
                     />

                <button type="submit"
                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                    Login
                </button>

                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                    <a href="#" className="flex-2 underline">
                        Forgot password?
                    </a>

                    <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                        or
                    </p>
        
                    <Link to={'/signup'} className="flex-2 underline">
                        Create an Account
                    </Link>
                </div>
            </form>
        </div>
    </div>
</div>
    </>
  )
}

export default SignIpUser