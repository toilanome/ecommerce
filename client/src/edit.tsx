import React, {useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import axios from 'axios'

const Update = () => {
    const [dataProduct , setDataProduct] = useState([] as any)
    useEffect(() => {
        // Hàm này sẽ chạy sau mỗi lần component được render
    
        // Gọi API sử dụng Axios trong useEffect
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/products');
            setDataProduct(response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Gọi hàm fetchData để lấy dữ liệu từ API
        fetchData();
      }, []); // T
      console.log('data', dataProduct);

    const [inputValue, setInputValue] =useState({})
    const token = localStorage.getItem('AccessToken')
    if (!token) {
        // Xử lý trường hợp không có token
        console.error("Không có token.");
        return;
    }else{
        console.log(token);
        
    }
    const url = axios.create({
        baseURL:'http://localhost:8080/api',
        headers: {Authorization: `Bearer ${token}`}
    })
    const update = (product:any) =>{
        return url.put('/products/:id', product)
    }

    const mutationAccount = useMutation({
        mutationFn: (product:any) => update(product),
        onSuccess(res){
            console.log(res.data);
            
       alert("login thành công")

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
    //    console.log(res);
       
    }

  return (
    <>
        

                <div className="containers">
                    <h1 className="title">update</h1>
                    <div className="card">
                        <form onSubmit={onSubmit}>
                        <input type="text" placeholder='tên' onChange={onChange} name='title' defaultValue={dataProduct?.title}/>
                        <input type="text" placeholder='slug' onChange={onChange} name='slug'/>
                        <input type="text" placeholder='price' onChange={onChange} name='price'/>
                        <input type="text" placeholder='des' onChange={onChange} name='description'/>
                        <input type="text" placeholder='brand' onChange={onChange} name='brand'/>
                            <div className="buttons">
                                <button type="submit" className="login-button">tạo</button>
                            </div>
                        </form>
                    </div>
                </div>
    </>
  )
}

export default Update