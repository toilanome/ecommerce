import Header from '../pages/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import {useContext} from 'react'
import  { ProductShopContext } from '../Context/ProductContext'
import Loading from '../Components/Loading'

const PageLayout = () => {
  const {isLoading} = useContext(ProductShopContext)
  if(isLoading) return <Loading />
  return (
    <>
    
     <Header />
        
                <Outlet />
    <Footer/>
    </>
  
  )
}

export default PageLayout