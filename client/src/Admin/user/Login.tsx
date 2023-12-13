import  { useState } from 'react'
import { useMutation } from 'react-query';
import { login } from '../../api/User';

const Login = () => {

    const [inputValue, setInputValue] =useState({})
    

    const mutationAccount = useMutation({
        mutationFn: (user:any) => login(user),
        onSuccess(response) {
            const { Accesstoken, userData } = response.data;
        
            // Lưu token mới vào Local Storage
            localStorage.setItem('AccessToken', Accesstoken);
        
            // Hiển thị thông báo đăng nhập thành công hoặc thực hiện các hành động khác
            alert("Đăng nhập thành công");
          },
        
        onError(){
            throw new Error("Đăng nhập thất bại, kiểm tra lại thông tin ")
        }
    })

    const onChange = (e:any) =>{
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]:value
        })
    }
    

    const onSubmit = async(e:any) =>{
        e.preventDefault()
        const response = await mutationAccount.mutateAsync(inputValue);
        console.log('response ', response);
        
    }

    

  return (
    <>
    <div className="w-full h-auto overflow-scroll block  p-4 flex items-center justify-center " >
    <div className="bg-white py-6 px-10 sm:max-w-md w-full " style={{boxShadow: "2px 2px 34px 15px rgb(245 237 239)"}}>
        <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
            Login Form 
        </div>
        <div className="">
          <form onSubmit={onSubmit}>
          <div>
                 <input type="email" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8"  placeholder="Email Adress " onChange={onChange} name='email' required/>
            </div>
            
             
            <div className="">
                <input type="password" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"  placeholder="Password " onChange={onChange} name='password' required/>
            </div>
            
            <div className="flex justify-center my-6">
                <button className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold " >
                    Login
                </button>
            </div>
            <div className="flex justify-center ">
                <p className="text-gray-500">Already have an acount? </p>
                <a href="" className="text-sky-600 pl-2"> Sign In</a>
            </div>
          </form>
             
        </div>
    </div>
</div>
    </>
  )
}

export default Login