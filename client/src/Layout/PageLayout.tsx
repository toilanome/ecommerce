import Header from '../pages/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'

const PageLayout = () => {
  return (
    <>
     <Header />
        
                <Outlet />
    <Footer/>
    </>
  
  )
}

export default PageLayout