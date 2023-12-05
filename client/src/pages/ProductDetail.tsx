import React from 'react'

const ProductDetail = () => {
  return (
    <>
     <div className='container flex justify-center'>
            <div >
                        <div className='flex gap-28' >
                        <>
                        <div>
                            <img src='https://res.cloudinary.com/dq6hflqwx/image/upload/v1567499955/GitHub/react-icons-collection.jpg' style={{ height: '700px', width:'700px' }} alt="" />
                        </div>
    
                        <div className='info '>
                            <div>
                                <span>ok</span>
    
                                <div className='mb-3 mt-3'>
    
                                    <h2>sf</h2>
                                </div>
    
                                {/* <span>Collection fw'20</span> */}
                                {/* <br /> */}
                                {/* <div className='mb-3 mt-3'>
                                    <span>Black OAK</span>
    
                                </div> */}
                                <br />
                                <div className='w-64 mb-5'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aliquid exercitationem voluptates vel quasi. Officia doloremque animi, molestias a, ex fugit illo asperiores atque voluptatem mollitia, totam officiis dolores rem!</p>
    
                                </div>
                            </div>
    
                            <div>
                                Size : <select name="" id="">
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="L">XL</option>
                                </select>
                                <br />
                                <div className='mt-5'>
                                    Quanlity <input type="number" />
    
                                </div>
                                <br />
    
                                <span>$ 3333</span>
                            </div>
    
                            <div className='mt-9'>
                            <button
className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-gray-200 text-black-600"
type="button"
>
Add to Cart
</button>
                            </div>
    
                        </div>

                         
                        </>
                       
                        
                    </div>
                
            </div>
        </div>
    </>
  )
}

export default ProductDetail