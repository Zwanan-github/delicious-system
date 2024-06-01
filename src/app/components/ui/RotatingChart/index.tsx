"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import {Autoplay, Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {Image} from "@nextui-org/image";

export const RotatingChart = () => {
    const images = [
        "/images/rotating/main.png",
        "/images/rotating/second.png",
        "/images/rotating/third.png"
    ];

    return (
        <div className={"w-[90%] md:w-[50%] h-full mx-auto overflow-hidden"}>
            <Swiper
                className={"flex"}
                // install Swiper modules
                modules={[Autoplay, Pagination]}
                spaceBetween={1}
                slidesPerView={1}
                autoplay={{ delay: 3000, pauseOnMouseEnter: true }} // 设置自动播放的间隔时间, 鼠标移入时暂停播放
                pagination={{ clickable: true }}
                loop={true}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <Image className={"w-full overflow-auto"} loading={"eager"} width={"90%"} height={"30%"} src={image} alt={`Image ${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}