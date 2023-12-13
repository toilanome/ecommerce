import  { useContext } from 'react'
import { ProductShopContext } from '../Context/ProductContext'

const Bills = () => {

    const {bill, isError,isLoading,userDetail} = useContext(ProductShopContext)
    
    const infoUser = userDetail?.response
    console.log('info ', infoUser);
    
    const listBill = bill?.response
    console.log('bill :' , listBill);
    
    

    if(isLoading) return <div>loading...</div>
    if(isError) throw new Error("Something wrong")

  return (
    <div className='container '>
        <div className='mx-auto max-w-screen-xl'>
            <h1 className='text-center'>List Bills</h1>
    <div className="min-h-screen flex items-center justify-center px-4">
    
    <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl mb-10">
        {listBill?.map((item:any,index:number) =>(
            <>
            <div key={index} className='mb-10'>
            <div className="p-4 border-b">
            <h2 className="text-2xl ">
                Hóa đơn mua sắm
            </h2>
           
        </div>
        <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Họ và tên 
                </p>
                <p>
                    {infoUser?.name}
                </p>
            </div>
            
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Email 
                </p>
                <p>
                    {infoUser?.email}
                </p>
            </div>
            
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    SĐT
                </p>
                <p>
                    {infoUser?.mobile}
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                <p className="text-gray-600">
                    Tổng giá trị đơn hàng
                </p>
                <div className="space-y-2">
                    <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                        <div className="space-x-2 truncate">
                           {(item.total).toLocaleString('vi-VN')} VNĐ
                        </div>
                        
                    </div>

                    
                </div>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Trạng thái đơn hàng
                </p>
                <p>
                    {item.status}
                </p>
            </div>
        </div>
            </div>
            
        </>

        ))}
        
    </div>




   
</div>
        </div>
    </div>
  )
}

export default Bills