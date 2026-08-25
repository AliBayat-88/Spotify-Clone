import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import BoxSong from './BoxSong.jsx'
import HeadingText from './HeadingText.jsx'
import BoxSongSkeleton from './BoxSongSkeleton.jsx'
import { NavLink } from 'react-router-dom'

function EachAlbum({ headingText, infos, isArtist, variant , onClick , isLoading , isPlaylist , sectionId }) {
  console.log(infos)

  const skeletonArray = Array.from({ length: 7 });

  return (
    <div className="py-4 select-none">

      <div className="flex items-center justify-between px-4 mb-4">
        <HeadingText>{headingText}</HeadingText>
        {sectionId && (
          <NavLink
            to={`/section/${sectionId}`}
            className="text-xs sm:text-sm transition-all hover:underline font-bold text-[#b3b3b3] hover:text-white"
          >
            Show all
          </NavLink>
        )}
      </div>

      {variant === "slider" && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={14}
          slidesPerView={2.2}
          navigation={true}
          className="music-swiper !px-4"
          breakpoints={{
            480: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.2 },
            768: { slidesPerView: 4.2 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {isLoading
            ? skeletonArray.map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <BoxSongSkeleton isArtist={isArtist} />
              </SwiperSlide>
            ))
            : infos?.map((info) => (
              <SwiperSlide key={info.id} className="h-auto pt-1 flex">
                <BoxSong isPlaylist={isPlaylist} info={info} isArtist={isArtist} onClick={() => onClick?.(info.id)} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      )}

      {/* 🟢 حالت گرید خالص (بدون دستکاری پیکسلی و کاملاً واکنش‌گرا) */}
      {variant === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
          {infos?.map(info => (
            <SwiperSlide className="h-auto pt-1 flex" key={info.id}>
              <BoxSong
                info={info}
                isArtist={isArtist}
                isPlaylist={isPlaylist}
                onClick={() => onClick?.(info.id)}
              />
            </SwiperSlide>
          ))}
        </div>
      )}

      {/* 🟢 حالت ترکیبی (Responsive) */}
      {variant === "responsive" && (
        <>
          {/* Mobile & Tablet → Slider */}
          <div className="block lg:hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={12}
              slidesPerView={2.3}
              navigation={true}
              className="music-swiper !px-4"
              breakpoints={{
                768: { slidesPerView: 3.5 },
                1024: { slidesPerView: 4.5 },
                1280: { slidesPerView: 5.5 },
              }}
            >
              {infos?.map(info => (
                <SwiperSlide key={info.id}>
                  <BoxSong
                    info={info}
                    isArtist={isArtist}
                    isPlaylist={isPlaylist}
                    onClick={() => onClick?.(info.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden lg:grid grid-cols-5 xl:grid-cols-6 gap-4 px-4">
            {infos?.slice(0, 6).map(info => (
              <BoxSong
                key={info.id}
                info={info}
                isArtist={isArtist}
                isPlaylist={isPlaylist}
                onClick={() => onClick?.(info.id)}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default EachAlbum;