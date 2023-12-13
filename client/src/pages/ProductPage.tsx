import  { useContext } from "react";
import Brum from "../Components/Brum/Brum";
import { ProductShopContext } from "../Context/ProductContext";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { products, isError, isLoading } =
    useContext(ProductShopContext);
  console.log("product", products);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    throw new Error("Something wrong");
  }

  return (
    <>
      <section className="container ">
        <Brum />
        <h2 className="text-center mt-10">All Products</h2>
        <div className="grid grid-cols-3">
        {products?.message?.map((item: any, index: number) => (

          <div key={index} className="mx-auto max-w-screen-xl mt-10">
           
              <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                  <img
                    src={item.images}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                      {item.title}
                    </p>
                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                      $ {item.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                    {item.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <Link to={`/products/detail/${item._id}`}>
                  <button
                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-200 text-black-600"
                    type="button"
                  >
                    Add to Cart
                  </button>
                  </Link>
                 
                </div>
              </div>
          </div>
            ))}

        </div>

      </section>
    </>
  );
};

export default ProductPage;
