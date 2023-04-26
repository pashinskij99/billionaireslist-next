import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import 'tippy.js/dist/tippy.css'
import Meta from '../../components/Meta'
import { CelebritiesService } from '../../services/celebrities.service'
import { format } from 'date-fns'
import { getCelebrityInfo } from '../../utils/celebrityInfo'
import { mainNetWorthFormat } from '../../utils/formatNumber'
import { serializeCategory } from '../../utils/serializeCategories'
import { HeadLine } from '../../components/component'
import BidsCarousel from '../../components/carousel/bidsCarousel'
import Image from 'next/image'
import Loader from '../../components/preloader/Loader'

export const getServerSideProps = async (ctx) => {
  const { i } = ctx.query
  const { data } = await CelebritiesService.getCelebrityById(i)

  return {
    props: {celebrity: data},
  }
}

const Item = ({ celebrity }) => {
  
  const [relatedCelebrities, setRelatedCelebrities] = useState([])
  const [page, setPage] = useState('1')
  const [isLoading, setIsLoading] = useState(true)
  const [imageModal, setImageModal] = useState(false)

  useEffect(() => {
    const getCelebrity = async () => {
      try {
        setIsLoading(true)
        const { data: relatedCelebrities } = await CelebritiesService.getCelebrities({
          perPage: '4',
          page,
          ...(celebrity.categories && { ...serializeCategory(`${celebrity.categories.join(',')}`) }),
        })
        setRelatedCelebrities(relatedCelebrities.celebrities)
        setPage(relatedCelebrities.pagination.next_page)
        setIsLoading(false)
      } catch (e) {
      }

    }
    getCelebrity()
  }, [])

  return (
    <>
      <Meta
        title={`${celebrity?.name} Net Worth - Billionaires List`}
        desc={celebrity?.description}
      />
      
      {
        isLoading 
          ? (
              <div className='h-[100vh] w-full flex justify-center items-center'>
                <Loader />
              </div>
            )
          : (
            <ContentPage 
              celebrity={celebrity}
              imageModal={imageModal} 
              relatedCelebrities={relatedCelebrities}
              setImageModal={setImageModal}
            /> 
          )
      }
    </>
  )
}

const ContentPage = ({celebrity, imageModal, relatedCelebrities, setImageModal}) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <section className='relative lg:mt-24 lg:pt-24  mt-24 pt-12'>
        <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
          <img src='/images/gradient_light.jpg' alt='gradient' className='h-full' />
        </picture>
        <div className='container'>
          <div className='md:flex md:flex-wrap' key={id}>
            <figure className='mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full'>
              <button className='w-full h-[550px] relative' onClick={() => setImageModal(true)}>
                <Image
                  src={
                    celebrity?.profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'
                  }
                  alt={`${celebrity.name} Photo`}
                  layout='fill'
                  className='rounded-2xl cursor-pointer w-full'
                  objectFit='cover'
                  unoptimized
                />
              </button>

              <div className={imageModal ? 'modal fade show block' : 'modal fade'}>
                <div className='modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center'>
                  <img
                    src={celebrity?.profile_image}
                    alt={`${celebrity.name} profile image`}
                    className='rounded-2xl'
                  />
                </div>

                <button
                  type='button'
                  className='btn-close absolute top-6 right-6'
                  onClick={() => setImageModal(false)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    className='h-6 w-6 fill-white'>
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
                  </svg>
                </button>
              </div>
            </figure>

            <div className='md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]'>
              <div className='mb-3 flex'>
                <div className='flex items-center'>
                  <a className='text-accent mr-2 text-lg font-bold'>
                    Net Worth: ${mainNetWorthFormat(celebrity.net_worth)}
                  </a>
                </div>
              </div>

              <h1 className='font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white'>
                {celebrity.name}
              </h1>

              <div className='mb-8 flex items-center space-x-4 whitespace-nowrap'>
                <span className='dark:text-jacarta-300 text-jacarta-400 text-sm'>
                  Published: {celebrity?.created && format(new Date(celebrity?.created), 'dd/MM/y')}
                </span>
              </div>

              <div
                className='tab-pane fade'
                id='properties'
                role='tabpanel'
                aria-labelledby='properties-tab'>
                <div className='dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10'>
                  <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3'>
                    {celebrity.age &&
                      getCelebrityInfo(celebrity).map(
                        ({ id, name, value }) =>
                          value && (
                            <div
                              key={id}
                              className='dark:bg-jacarta-800 dark:border-jacarta-600 bg-light-base rounded-2lg border-jacarta-100 flex flex-col space-y-2 border p-5 text-center transition-shadow hover:shadow-lg'>
                              <span className='text-accent text-sm uppercase'>{name}</span>
                              <span className='text-jacarta-700 text-base dark:text-white'>
                                {value}
                              </span>
                            </div>
                          ),
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className='dark:text-jacarta-300 mb-10 mt-10' dangerouslySetInnerHTML={{ __html: celebrity.description }}></p>
        </div>
      </section>

      <section className='dark:bg-jacarta-800 bg-light-base py-24'>
        <div className='container'>
          <HeadLine
            text='Discover more celebrities'
            classes='font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white'
          />
          <div className='relative'>
            <BidsCarousel data={relatedCelebrities} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Item
