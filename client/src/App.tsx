import {Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './Admin/Dashboard'
import AddProduct from './Admin/AddProduct'
import User from './Admin/user/User'
import SignUp from './Admin/user/SignUp'
import Login from './Admin/user/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ListProduct from './Admin/Product'
import UpdateProduct from './Admin/UpdateProduct'
import PageLayout from './Layout/PageLayout'
import ProductPage from './pages/ProductPage'
import SignUpUser from './Components/FormLogin/SignUpUser'
import SignIpUser from './Components/FormLogin/SignInUser'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Bills from './pages/Bills'

function App() {

  return (
    <>

      <Routes>
        
        <Route path='/' element={<PageLayout />}>
            <Route path='' element={<Home />} />
            <Route path='products' element={<ProductPage />} />
            <Route path='products/detail/:id' element={<ProductDetail />} />
            <Route path='cart' element={<Cart />} />
            <Route path='bill' element={<Bills />} />
           

        </Route>

        <Route path='signup' element={<SignUpUser />} />
            <Route path='signin' element={<SignIpUser />} />


        <Route path='/admin'  element={<Dashboard />}>
          
          <Route path='products' element={<ListProduct />} />
          <Route path='products/updateProduct/:id' element={<UpdateProduct />} />
          <Route path='products/addProduct' element={<AddProduct />} />
          <Route path='user' element={<User />} />
          <Route path='user/signup' element={<SignUp />} />
          <Route path='user/login' element={<Login />} />
        </Route>
      </Routes>
        
          
        
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />




    </>
        
     
  
  )
}

export default App
