/** @format */

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'
import 'tippy.js/dist/tippy.css'
import Link from 'next/link'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { mainNetWorthFormat } from '../../utils/formatNumber'
import { setCelebrityId } from '../../redux/configs/configs.slice'
import { useDispatch } from 'react-redux'
import { getCelebritieLinkParams } from '../../utils/getCelebritieLinkParams'

const BidsCarousel = ({ data }) => {
  const dispatch = useDispatch()
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView='auto'
        loop={true}
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: '.bids-swiper-button-next',
          prevEl: '.bids-swiper-button-prev',
        }}
        className='card-slider-4-columns !py-5'>
        {data.map(({ id, name, net_worth, present_ranking, profile_image }) => {
          return (
            <SwiperSlide className='text-white' key={id}>
              <Link href={getCelebritieLinkParams(name, id)}>
                <article onClick={() => dispatch(setCelebrityId(id))}>
                  <div className='dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 cursor-pointer rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500'>
                    <figure className='h-[330px] w-full relative'>
                      <Image
                        src={profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'}
                        alt={`${name} Photo`}
                        className='w-full rounded-[0.625rem]'
                        layout='fill'
                        objectFit='cover'
                        unoptimized
                      />
                    </figure>
                    <div className='mt-7 flex items-center justify-between'>
                      <a>
                        <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-white'>
                          {name}
                        </span>
                      </a>

                      <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-white ml-4'>
                        {present_ranking ? `Rank #${present_ranking}` : 'Without rank'}
                      </span>
                    </div>
                    <div className='mt-2 text-sm'>
                      <span className='dark:text-jacarta-100 text-jacarta-700'>
                        ${mainNetWorthFormat(net_worth)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {/* <!-- Slider Navigation --> */}
      <div className='group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden'>
        <MdKeyboardArrowLeft />
      </div>
      <div className='group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden'>
        <MdKeyboardArrowRight />
      </div>
    </>
  )
}

export default BidsCarousel
