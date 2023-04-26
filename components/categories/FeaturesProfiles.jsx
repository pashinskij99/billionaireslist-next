/** @format */

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'

import { useRouter } from 'next/router'

import HeadLine from '../headLine'

import 'tippy.js/themes/light.css'
import { CelebritiesService } from '../../services/celebrities.service'
import { mainNetWorthFormat } from '../../utils/formatNumber'
import { useDispatch } from 'react-redux'
import { setCelebrityId } from '../../redux/configs/configs.slice'
import { getCelebritieLinkParams } from '../../utils/getCelebritieLinkParams'

const FeatureProfiles = ({ featuredCelebrities, pagination }) => {
  const dispatch = useDispatch()

  const [celebrities, setCelebrities] = useState(featuredCelebrities)
  const [page, setPage] = useState(pagination?.next_page)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleLoadMore = async () => {
    if (page <= 2) {
      setIsLoading(true)
      const { data } = await CelebritiesService.getFeaturedCelebrities({ perPage: '8', page: page })
      setCelebrities((prev) => [...prev, ...data.celebrities])
      setPage(data.pagination.next_page)
      setIsLoading(false)
    } else {
      router.push('/listings')
    }
  }

  useEffect(() => {
    setCelebrities(featuredCelebrities)
    setPage(pagination?.next_page)
  }, [featuredCelebrities, pagination])

  return (
    <div>
      <section className='pt-24'>
        <div className='container'>
          <HeadLine
            text='Featured Profiles'
            classes='font-display mb-4 text-center text-6xl animate-gradient'
          />
          <HeadLine
            text='Explore Your Favorite Celebrity'
            classes='font-display mb-10 text-center text-md text-jacarta-base dark:text-white'
          />
          <div className='grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4'>
            {celebrities?.map(({ id, profile_image, name, present_ranking, net_worth }) => {
              return (
                <article onClick={() => dispatch(setCelebrityId(id))} key={name + id}>
                  <Link href={getCelebritieLinkParams(name, id)}>
                    <div className='dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 cursor-pointer  rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg'>
                      <figure className='relative'>
                        <a>
                          <Image
                            src={
                              profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'
                            }
                            alt={`${name} photo`}
                            className='w-full rounded-[0.625rem]'
                            loading='lazy'
                            height='100%'
                            width='100%'
                            layout='responsive'
                            objectFit='cover'
                            unoptimized
                          />
                        </a>
                      </figure>
                      <div className='mt-7 flex items-center justify-between'>
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
                  </Link>
                </article>
              )
            })}
          </div>

          {page && (
            <div className='mt-10 text-center'>
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className={cn(
                  'bg-accent shadow-accent-volume hover:bg-accent-dark inline-block rounded-full py-3 px-8 text-center font-semibold text-white transition-all',
                  {
                    ['brightness-75']: isLoading,
                  },
                )}>
                {isLoading ? 'Loading..' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default FeatureProfiles
