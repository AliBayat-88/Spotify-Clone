import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import BoxSong from './BoxSong.jsx'
import HeadingText from './HeadingText.jsx'



function EachAlbum({headingText , songs}) {
  return (
    <div className="pl-3 py-5">

      <div className="flex items-center justify-between pr-4 pl-4">
        <HeadingText>{headingText}</HeadingText>
        <a href="#" className="text-sm transition-all hover:opacity-70  font-semibold text-gray-300">show all</a>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="music-swiper"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.id}>
            <BoxSong song={song} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}

export default EachAlbum;