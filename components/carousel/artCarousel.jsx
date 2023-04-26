import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'tippy.js/dist/tippy.css'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import Link from 'next/link'
import { mainNetWorthFormat } from '../../utils/formatNumber'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setCelebrityId } from '../../redux/configs/configs.slice'
import { getCelebritieLinkParams } from '../../utils/getCelebritieLinkParams'

const ArtsCarousel = ({ data }) => {
  const dispatch = useDispatch()
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView='auto'
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className=' card-slider-4-columns !py-5'>
        {data.map(({ id, name, net_worth, present_ranking, profile_image }) => {
          return (
            <SwiperSlide key={id}>
              <article onClick={() => dispatch(setCelebrityId(id))}>
                <Link href={getCelebritieLinkParams(name, id)}>
                  <div className='dark:bg-jacarta-700 cursor-pointer rounded-lg block overflow-hidden bg-white shadow-md transition-shadow hover:shadow-lg'>
                    <figure className='relative'>
                      <a className='relative block w-[370px] h-[450px]'>
                        <Image
                          src={profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'}
                          unoptimized
                          alt={`${name} Photo`}
                          layout='fill'
                          objectFit='cover'
                          className='swiper-lazy h-[430px] w-full object-cover swiper-lazy-loaded rounded-2.5xl'
                        />
                      </a>
                    </figure>
                    <div className='p-6'>
                      {/* <div className='flex'> */}

                      <div className='flex items-center justify-between'>
                        <a>
                          <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-white'>
                            {name}
                          </span>
                        </a>

                        <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-white'>
                          {present_ranking ? `Rank #${present_ranking}` : 'Without rank'}
                        </span>
                      </div>
                      <div className='mt-2 text-sm'>
                        <span className='dark:text-jacarta-100 text-jacarta-700'>
                          ${mainNetWorthFormat(net_worth)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* </div> */}
                <div></div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* <!-- Slider Navigation --> */}
      <div className='group swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-0 md:!-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden'>
        <MdKeyboardArrowLeft />
      </div>
      <div className='group swiper-button-next shadow-white-volume absolute !top-1/2 !-right-0 md:!-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden'>
        <MdKeyboardArrowRight />
      </div>
    </>
  )
}

export default ArtsCarousel
