'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';

const SwiperImg = (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={3}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 no-select"
            >

                {
                    props.imgSRC?.map((SRC, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <picture>
                                    <img className="w-full lg:h-[25rem] sm:h-[40rem] h-[18rem] object-cover rounded-md" src={`https://divarapi.liara.run/${SRC?.path}`} alt="test" />
                                </picture>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>

            <Swiper
                onClick={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper my-4 no-select"
            >
                {props.imgSRC?.map((SRC, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <picture>
                                <img className=" object-cover h-28 w-28 rounded-md" src={`https://divarapi.liara.run/${SRC?.path}`} alt="test" />
                            </picture>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}

export default SwiperImg;