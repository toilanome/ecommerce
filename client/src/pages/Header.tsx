import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { getUserDetail } from '../api/User';
import { VscSignOut } from "react-icons/vsc";
import { toast } from 'react-toastify';
import { RiFileList2Line } from "react-icons/ri";
interface UserDetailsResponse {
    response: {
      name: string;
      // Other properties...
    };
  }
  type User = {
    name? : string
  }
const Header = () => {

    const [data, setData] = useState<User>({})
    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const token = localStorage.getItem('AccessToken');
            if (token) {
              const res = await getUserDetail();
              const userDetails: UserDetailsResponse = res.data;
              setData(userDetails.response);
            } return null
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
      
        fetchUserDetails();
      }, []);
      
 
  
    const logoutUser = async () => {
        try {
       
          // Xóa token từ localStorage
          localStorage.removeItem('AccessToken');
          toast.success("Logout thành công");
          setTimeout(() =>{
            window.location.reload();

          }, 1000)
        } catch (error) {
          console.error("Logout error:", error);
          // Xử lý lỗi nếu cần
          toast.error("Đã xảy ra lỗi khi đăng xuất");
        }
     }

  
    
  return (
   
    <>
    <header className='container'>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Toilanome</span>
            </a>
            {data?.name ? (
                <>
                <div className='flex items-center lg:order-2'>
                    <p className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Xin chào : {data?.name}</p>
                    <button onClick={logoutUser} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    <VscSignOut />
                    </button>

                    <Link to={'/cart'}>
                    <button  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    <IoCartOutline />

                     </button>

                    </Link>
                    <Link to={'/bill'}>
                    <button  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    <RiFileList2Line />

                     </button>

                    </Link>
                   
                </div>
                </>
                
            ) : (
                <div className="flex items-center lg:order-2">
                <Link to={'signin'} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"><RiAccountPinCircleFill /></Link>
                <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                <IoCartOutline />
                </a>
              
            </div>
            )}
           
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <Link to={'/'} className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link to={'/products'} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
    </>
  )
}

export default Header

