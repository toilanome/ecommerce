// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
    <div className='max-w-screen-xl mx-auto'>
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper" >
    <SwiperSlide>
            <img src="https://images.pexels.com/photos/10679171/pexels-photo-10679171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </SwiperSlide>  
        <SwiperSlide>
            <img src="https://images.pexels.com/photos/175696/pexels-photo-175696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://images.pexels.com/photos/8555399/pexels-photo-8555399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </SwiperSlide>
        
        
        
    
      </Swiper>
    </div>
      
    </>
  );
}
