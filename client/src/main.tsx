import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import ProductContext from './Context/ProductContext.tsx'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ProductContext>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      </ProductContext>
    </QueryClientProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
