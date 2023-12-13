import { useContext, useState } from "react";
import { ProductShopContext } from "../Context/ProductContext";
import { useParams } from "react-router-dom";
import { IProduct } from "../interface/User";
import { useMutation, useQueryClient } from "react-query";
import {toast} from 'react-toastify'
import { updateCart } from "../api/User";

const ProductDetail = () => {


  const { id } = useParams();
  const {products} = useContext(ProductShopContext)
  const data =
    products &&
    products.message.find((product: IProduct) => product._id === id);

  const queryClient = useQueryClient();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');

  const mutationAddToCart = useMutation(
    async () => {
      try {
        // Assuming pid is the product ID
        const updateToCart = await updateCart({
          pid: id,
          quantity: selectedQuantity || 1,
          color: selectedColor || 'Black',
        });
        console.log('cart:', updateToCart);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => {
        toast.success("Thêm sản phẩm thành công")
        queryClient.invalidateQueries();
      },
    }
  );

  const handleAddToCart = async () => {
    await mutationAddToCart.mutateAsync();
    console.log('thêm thành công');
  };

  return (
    <>
      <div className="container flex justify-center">
        <div>
            <div className="flex gap-28">
              <>
                <div>
                  <img
                    src={data?.images}
                    style={{ height: "700px", width: "700px" }}
                    alt=""
                  />
                </div>

                <div className="info ">
                  <div>
                    <span>{data?.title}</span>

                    <div className="mb-3 mt-3">
                      <h2>{data?.brand}</h2>
                    </div>

             
                    <br />
                    <div className="w-64 mb-5">
                      <p>
                        {data?.description}
                      </p>
                    </div>
                  </div>

                  <div>
                   
                    <br />
                    <label htmlFor="color">Color : </label>
                    <select className="border-solid border-gray-400 border-[1px] rounded cursor-pointer font-sans " value={selectedColor} id="color" onChange={(e) => setSelectedColor(e.target.value)}>
                      <option value="black">Black</option>
                      <option value="blue">Blue</option>
                      <option value="red">Red</option>
                    </select>
                    <br />
                    <div className="mt-5">
                      Quanlity :  <input type="number" defaultValue={1} onChange={(e) => setSelectedQuantity(Number(e.target.value))}  />
                    </div>
                    <br />
                    <span> Price : {data?.price} VNĐ</span>
                  </div>

                  <div className="mt-9">
                    <button  onClick={handleAddToCart}
                      className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-200 text-black-600"
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

