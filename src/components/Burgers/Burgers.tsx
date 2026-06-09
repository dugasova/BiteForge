import './Burgers.scss';
import { BURGERS } from '../../mockedData';
import BurgerCard from './BurgerCard';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Burgers() {
  const { t } = useTranslation();

  return (
    <div className="burgers-container">
      <h1>{t('burgers.title')}</h1>
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
          {BURGERS.map(({ id, ...cardProps }) => (
            <SwiperSlide key={id}>
              <BurgerCard {...cardProps} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
