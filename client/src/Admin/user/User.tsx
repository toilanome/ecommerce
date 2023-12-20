import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductShopContext } from '../../Context/ProductContext';

const User = () => {

  const {user, isError, isLoading,mutationDeleteUser,userDetail} = useContext(ProductShopContext)
  console.log('user : ', user);
  console.log('userDetail : ', userDetail);
  
  const handleDeleteUser = (_id :any) => {
    const isConfirmed = window.confirm('Bạn có muốn xóa người dùng này không?');

    if (isConfirmed) {
      mutationDeleteUser.mutate(_id);
    }
  };

  if(isLoading) {
    return <div>Loading...</div>
  }
  if(isError){
    throw new Error("Something wrong")
  }

  if (userDetail?.response?.role !== 'admin') {
    return <div className='flex items-center justify-center w-full'>
      <h2 className='text-red-600'>Chỉ có admin mới xem được trang này.</h2>
    </div>;
  }

  return (
    <>
      <div className="py-1 bg-blueGray-50 w-full " style={{marginTop:"-80px"}}>
<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24" style={{width:"100%"}}>
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">User</h3>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            <Link to='signup'>Add User</Link>
          </button>
        </div>
      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Name
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Email
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Mobile
                        </th>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Actions
                        </th>
        
          </tr>
        </thead>

        <tbody>
          {user?.response?.map((item:any, index:number) =>(
            <tr key={index}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              {item.name}
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
            {item.email}

            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {item.mobile}

            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
              <button className="bg-red-500 text-white active:bg-red-800 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() =>handleDeleteUser(item._id)}>Delete</button>
              

            </td>
          </tr>
          ))}
          
         
        </tbody>

      </table>
    </div>
  </div>
</div>

                </div>

    </>
  )
}

export default User