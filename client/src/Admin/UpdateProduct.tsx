import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useMutation, useQuery } from 'react-query';
import { getDetailProduct, updateProduct } from '../api/Product';
import { useParams } from 'react-router-dom';
import { ProductShopContext } from '../Context/ProductContext';
import { IProduct } from '../interface/User';

const UpdateProduct = () => {
    const {id} = useParams()
   console.log('check id', id);
   
    const [inputValue, setInputValue] =useState({})
    // const {isLoading, isError, products} = useContext(ProductShopContext)

    const {data, isLoading, isError} = useQuery({
        queryKey:['PRODUCT', id],
        queryFn: async () =>{
            try {
                const respone = await axios.get(`http://localhost:8080/api/products/${id}`)
                console.log("respone", respone);
                
                return respone.data
            } catch (error) {
                
            }
        }
    })
    console.log("data nè", data);
    



    if(isLoading) <div>Loading...</div>
    // const currentProduct = products && products?.message.find((product:any) => product._id == id);
    // console.log("data ", currentProduct);
    
    const mutationAccount = useMutation({
        mutationFn: async (product:any) =>{
            try {
                const response = await updateProduct(product)
                console.log("respone", response);
                
            } catch (error) {
                
            }
        },
        onSuccess(){
            // console.log(res.data);
            
           alert("update thành công")

        },
        onError(){
            throw new Error("tạo thất bại, kiểm tra lại thông tin ")
        }
    })

    const onChange = (e:any) =>{
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]:value
        })
    }
    

    const onSubmit = (product:IProduct) =>{
        // e.preventDefault()
        // mutationAccount.mutate({...products , product})
        console.log("upđae");
        
    //    console.log(res);
       
    }

  return (
    <>

<div className="flex items-center justify-center p-12" style={{width:"100%"}}>
    
  <div className="mx-auto w-full max-w-[550px]">
    <h2 className='text-center mb-3 block text-base font-medium text-[#07074D]'>Update Products</h2>
    <form  >
      <div className="mb-5">
        <label
          htmlFor="title"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Name Product
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          placeholder="Name Product"
          defaultValue={data.message.title}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="price"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          onChange={onChange}
          defaultValue={data.message.price}

          placeholder="0"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="slug"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          onChange={onChange}
          defaultValue={data.message.slug}


          placeholder="Slug"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="brand"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Brand
        </label>
        <input
          type="text"
          name="brand"
          id="brand"
          onChange={onChange}
          defaultValue={data.message.brand}


          placeholder="Brand"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="images"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Images
        </label>
        <input
          type="text"
          name="images"
          id="images"
          onChange={onChange}
          defaultValue={data.message.images}


          placeholder="Images"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Description
        </label>
        <input
         
          name="description"
          id="description"
          onChange={onChange}
              defaultValue={data.message.description}


          placeholder="Type your description"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div>
        <button
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
</>
  )
}

export default UpdateProduct