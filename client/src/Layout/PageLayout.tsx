import React from 'react'
import Header from '../pages/Header'
import { Outlet, Routes } from 'react-router-dom'
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