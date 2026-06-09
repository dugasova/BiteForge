import { useState, useEffect } from 'react';
import './Burgers.scss';
import { BURGERS } from '../../mockedData';
import BurgerCard from './BurgerCard';
import Loader from '../Loader/Loader';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Burgers() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader skeleton cards={3} />
  }

  return (
    <div className="burgers-container">
      <h1>Our Burgers</h1>
      <div className="swiper-wrapper-custom">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              effect: 'slide'
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
              effect: 'slide'
            },
          }}
          className="mySwiper"
        >
          {BURGERS.map((burger) => (
            <SwiperSlide key={burger.id}>
              <BurgerCard {...burger} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
