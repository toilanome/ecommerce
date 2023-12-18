import {useContext, useState} from 'react'
 import Swipers from "../Components/Swiper";
import { ProductShopContext } from '../Context/ProductContext';
import { IProduct } from '../interface/User';
import { Link } from 'react-router-dom';
const Home = () => {

  const {products,mutationGetCategory,categories, isLoading, isError} = useContext(ProductShopContext)
  const [selectCategoryId, setSelectCategoryId] = useState(null)

  console.log("category ", categories);
  
  const handleCategoryClick = async(_id:any) =>{
      setSelectCategoryId(_id)
      mutationGetCategory.mutateAsync(_id)
  }

  const filterProduct = selectCategoryId ? products?.message?.filter((product:IProduct) => product.category === selectCategoryId) : products?.message
  
  
  if(isError)  throw new Error("failed")
  if(isLoading) return <div>Loading...</div>
  
  


  return (
    <>
      <div className="container ">
          <Swipers />

        <h2 className="block  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 mt-10 text-center mb-5 font-sans font-bold  " style={{fontSize:'30px'}}>
          BEST SELLING <br /> 
        </h2>
        <h4 className="text-center mb-10 block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">Get in on the trend with our curated
          selection of best-selling styles.</h4> 

        <section className=" flex justify-between gap-5 mx-auto max-w-screen-xl">
          {products?.message?.slice(0,3).map((item:IProduct, index:number) =>(
            <div key={index} className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <Link to={`/products/detail/${item._id}`}>
              <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
              <img
                src={item?.images}
                className="h-full w-full object-cover"
              />
            </div>
              </Link>
           
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {item?.title}
                </p>
                <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900 antialiased">
                 {(item?.price).toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
               {item?.description}
              </p>
            </div>
            <Link to={`/products/detail/${item._id}`}>
            <div className="p-6 pt-0">

            <button
              className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-200 text-black-600"
              type="button"
            >
              Add to Cart
            </button>
            </div>
            </Link>
            
          </div>
          ))}
          

         
        </section>

        <h2 className="block  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 mt-10 text-center mb-5 font-sans font-bold  " style={{fontSize:'30px'}}>
          OUR PRODUCTS <br />{" "}
        </h2>

        <nav className="bg-white shadow dark:bg-gray-800">
    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">

    {categories?.data?.map((category:any) => (
            <a
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`${
                selectCategoryId === category._id
                  ? 'text-gray-800 dark:text-gray-200 border-b-2 border-blue-500'
                  : 'border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 cursor-pointer'
              } mx-1.5 sm:mx-6`}
            >
              {category.name} 
            </a>
          ))}



        
    </div>
</nav>

        <section className=" flex justify-between gap-5 mx-auto max-w-screen-xl">
        {filterProduct?.slice(0,4).map((item:IProduct,index:number) =>(

          <div key={index} className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <>
            <Link to={`/products/detail/${item._id}`}>
            <div key={index} className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
               <img
                 src={item?.images}
                 className="h-full w-full object-cover"
               />
             </div>
            </Link>
                
             <div className="p-6">
               <div className="mb-2 flex items-center justify-between">
                 <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900 antialiased">
                   {item?.title}
                 </p>
                 <p className="block font-sans text-sm font-medium leading-relaxed text-blue-gray-900 antialiased">
                   {(item?.price).toLocaleString('vi-VN')} VNĐ
                 </p>
               </div>
               <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                 {item?.description}
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
              </>
             
           
          </div>
            ))}


         

         
          
        </section>
        



        <section className='container bg-color mt-20'>
                <div  className='excluise  justify-center gap-32 grid grid-cols-2'>
                <div className="">
                    <img src="https://images.pexels.com/photos/4065842/pexels-photo-4065842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                    <div className="excluise-info mt-10 ">
                        <div className="excluise-title ">
                        <h3 className=' text-5xl font-bold color mb-8  text-gray-900' style={{fontSize:'70px'}}>Exclusive Offer</h3>
                         <p className='mb-8'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Magnam voluptatem doloremque officia pariatur ipsum atque  <br /> distinctio, quidem animi, veritatis soluta  rem beatae vitae expedita <br /> libero quasi vel odio. Beatae, similique. Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Magnam voluptatem doloremque officia pariatur ipsum atque  <br /> distinctio, quidem animi, veritatis soluta  rem beatae vitae expedita <br /> libero quasi vel odio. Beatae, similique. Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Magnam voluptatem doloremque officia pariatur ipsum atque  <br /> distinctio, quidem animi, veritatis soluta  rem beatae vitae expedita <br /> libero quasi vel odio. Beatae, similique.</p>
                        </div>

                        <div className="excluise-day mb-9 flex">
                            <div className="flex justify-center items-center  w-1/6 h-16 border border-y-green-300 bg-green-500  text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-4"> 
                                <span>06</span>
                                <span>Days</span>
                            </div>
                            <div className="flex justify-center items-center w-1/6 h-16 border border-y-green-300 bg-green-500  text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-4">
                                <span>06</span>
                                <span>Days</span>
                            </div>
                            <div className="flex justify-center items-center  w-1/6 h-16 border border-y-green-300 bg-green-500  text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-4">
                                <span>06</span>
                                <span>Days</span>
                            </div>
                        </div>
                        <div>
                            <button className=' select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase  transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-green-500 text-white w-2/6 h-16'>Buy Now</button>
                        </div>

                        
               
                    </div>

                
                </div>
               
            </section>


            <section className="  gap-5 mx-auto max-w-screen-xl bg-green-50  mt-20" >
              <div style={{margin:'0 auto'}} className="pt-5">
              <h2 className="block  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 mt-10 text-center mb-2 font-sans font-bold  " style={{fontSize:'30px'}}>
              Testimonials <br /> 
             </h2>
             <h4 className="text-center mb-10 block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">Some quotes from our happy customers</h4> 
              </div>

              <div className="row grid grid-cols-3 text-center  gap-5 pl-32 pr-32 pb-32"> 
                <div className="col bg-white p-7 shadow-lg ">
                  <div className="flex justify-center mb-5">
                    <img src="https://images.pexels.com/photos/19397637/pexels-photo-19397637/free-photo-of-dan-ba-sach-chan-dung-hang-d-t-kim.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="rounded-full h-14 w-14 "  />
                    
                  </div>
                  <div className="flex justify-center mb-3">
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                  </div>
                  <div>
                    <h4>“I love it! No more air fresheners”</h4>
                    <span className="text-xs text-gray-600">Lucifer</span>
                  </div>
                </div>

                <div className="col bg-white p-7 shadow-lg">
                  <div className="flex justify-center mb-5">
                    <img src="https://images.pexels.com/photos/19397637/pexels-photo-19397637/free-photo-of-dan-ba-sach-chan-dung-hang-d-t-kim.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="rounded-full h-14 w-14 "  />
                    
                  </div>
                  <div className="flex justify-center mb-3">
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                  </div>
                  <div>
                    <h4>“I love it! No more air fresheners”</h4>
                    <span className="text-xs text-gray-600">Lucifer</span>
                  </div>
                </div>

                <div className="col bg-white p-7 shadow-lg">
                  <div className="flex justify-center mb-5">
                    <img src="https://images.pexels.com/photos/19397637/pexels-photo-19397637/free-photo-of-dan-ba-sach-chan-dung-hang-d-t-kim.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="rounded-full h-14 w-14 "  />
                    
                  </div>
                  <div className="flex justify-center mb-3">
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                    <img src="src\assets\Star.svg" alt="" />
                  </div>
                  <div>
                    <h4>“I love it! No more air fresheners”</h4>
                    <span className="text-xs text-gray-600">Lucifer</span>
                  </div>
                </div>
                
              </div>
              
           
        
            </section>

      </div>
    </>
  );
};

export default Home;
