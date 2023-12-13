import axios from 'axios';
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
interface Product  {
  title: string;
  price: number;
  slug: string;
  brand: string;
  images: string;
  description: string;
  // Add other properties as needed
}
const UpdateProduct = () => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState({});
  const [product, setProduct] = useState<Product | null>(null);
  const token =localStorage.getItem('AccessToken'); // Lấy token từ localStorage

  const { isLoading} = useQuery<Product>({
    queryKey: ['PRODUCTS', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://ecomerce-server-uztg.onrender.com/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        const productDetail = response.data.message;
        console.log('response', productDetail);
        setProduct(productDetail);
        return productDetail;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
  });

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutationProduct = useMutation({
    mutationFn: async (updatedProduct) => {
      try {
        const response = await axios.put(`https://ecomerce-server-uztg.onrender.com/api/products/${id}`, updatedProduct, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('response', response);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries(['PRODUCTS']);

      toast.success('Product updated successfully');
     navigate('/admin/products')
    },
    onError: () => {
      toast.error('Update failed, please check the information.');
    },
  });

  const onChange = (e : any) => {

    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onSubmit = (e:any) => {
    e.preventDefault()
    mutationProduct.mutate(inputValue as any );
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>

<div className="flex items-center justify-center p-12" style={{width:"100%"}}>
    
  <div className="mx-auto w-full max-w-[550px]">
    <h2 className='text-center mb-3 block text-base font-medium text-[#07074D]'>Update Products</h2>
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
          defaultValue={product?.title}
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
          defaultValue={product?.price}

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
          defaultValue={product?.slug}

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
          defaultValue={product?.brand}

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
          defaultValue={product?.images}

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
          defaultValue={product?.description}

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