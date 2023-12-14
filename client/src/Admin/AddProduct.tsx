import { useState } from 'react'
import { useMutation } from 'react-query';
import { CreateProduct } from '../api/Product';

const AddProduct = () => {

    const [inputValue, setInputValue] =useState({})
    

    const mutationAccount = useMutation({
        mutationFn: (product:any) => CreateProduct(product),
        onSuccess(res){
            console.log(res.data);
         alert("Thêm  thành công")

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
    

    const onSubmit = (e:any) =>{
        e.preventDefault()
     const res = mutationAccount.mutate(inputValue)
       console.log(res);
       
    }

  return (
    <>

<div className="flex items-center justify-center p-12" style={{width:"100%"}}>
    
  <div className="mx-auto w-full max-w-[550px]">
    <h2 className='text-center mb-3 block text-base font-medium text-[#07074D]'>Create Products</h2>
    <form onSubmit={onSubmit} >
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
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          required
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
          required
          placeholder="Brand"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="category"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          onChange={onChange}
          required
          placeholder="category"
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

export default AddProduct