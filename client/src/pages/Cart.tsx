import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ProductShopContext } from "../Context/ProductContext";
import { createOrder } from "../api/Order";
import Modal from "../Components/Modal";
import { deleteProductCart } from "../api/User";
// import ShopContext, { ShopcontextMain } from '../Context/ShopContext'
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState();
  const [open, setOpen] = useState<boolean>(false);


const queryClient = useQueryClient()


  const { userDetail, isError, isLoading, products } =
    useContext(ProductShopContext);
  const cartUser = userDetail?.response;
  console.log("cart", cartUser);

  const productId = products?.message;
  // console.log("all product", productId);

  const productInCart = cartUser?.cart?.map((item: any) => {
    const matchProduct = productId?.find(
      (product: any) => product._id === item.product
    );
  
    
  


    return {
      ...matchProduct,
      quantity: item.quantity,
      color: item.color,
    };
  });
  console.log("product in cart ", productInCart);

  const totalPrice = productInCart?.reduce((sum: any, item: any) => {
    const total = sum + item.price * item.quantity;
    return total;
  }, 0);

  const handleCheckout = async () => {
    try {
      const response = await createOrder();
      setOrder(response.data);
      toast.success("Thanh toán thành công")
      setTimeout(() => {
        navigate('/bill')
      }, 3000);
      console.log("order : ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("bill order ", order);

  const mutationDeleteCart = useMutation({
    mutationFn :async (productId:any) =>{
        try {
            const response = await deleteProductCart({
                pid:productId
            })
            return response
        } catch (error) {
            
        }
    },
    onSuccess() {
        queryClient.invalidateQueries()
    }
})
const handleDeleteProduct = async (productId:any) =>{
    try {
        await mutationDeleteCart.mutateAsync(productId)
    } catch (error) {
        
    }
}
  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error("failed");

  return (
    <div>
      <div className="container">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>

                <th scope="col"  className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productInCart?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">
                    <img src={item.images} alt="" className="h-16 w-16" />
                  </td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.color}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td className="px-6 py-4 text-right ">
                    <div className="text-center">
                    <button  onClick={ () => handleDeleteProduct(item._id)} 
                   className="">
                   <FaRegTrashAlt />

                   </button>
                    </div>
                    
                   
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between  mt-24 ">
          <div></div>
          <div className="text-right">
            <span className="mr-5">Subtotal : </span>
            <span>{totalPrice?.toLocaleString("vi-VN")} VNĐ</span>
            <br />
            <div className="">
              <span className="text-xs mb-8">
                Taxes and shipping calculated at checkout
              </span>
            </div>
            <br />

            <section >
              <button onClick={() => setOpen(true)}
                className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-200 text-black-600"
                type="button"
              >
                CHECKOUT
              </button>
            </section>

                <Modal open={open} onClose={() => setOpen(false)}  >
                    <div className="flex flex-col gap-4">
                        <h1 className="text-center">Qr Code</h1>
                        <div>
                            <p className="text-center">Số tiền bạn cần phải trả là : {totalPrice?.toLocaleString('vi-VN') } VNĐ</p>
                            <img src="https://1.bp.blogspot.com/-dHN4KiD3dsU/XRxU5JRV7DI/AAAAAAAAAz4/u1ynpCMIuKwZMA642dHEoXFVKuHQbJvwgCEwYBhgL/s1600/qr-code.png" alt="" />
                            <p>(Khi chuyển khoản vui lòng ghi rõ thông tin người dùng)</p>
                        </div>


                    </div>
                    <div className="float-right mt-4">
                    <button onClick={handleCheckout}   className="block select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-blue-600 text-white"
                type="button">Thanh toán </button>
                    </div>
                 
                </Modal>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
