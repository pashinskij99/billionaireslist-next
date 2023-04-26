import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import Meta from '../../components/Meta'
import HeadLine from '../../components/headLine'

import { useRankings } from '../../hooks/useRankings'

import { mainNetWorthFormat } from '../../utils/formatNumber'
import Loader from '../../components/preloader/Loader'
import { useDispatch } from 'react-redux'
import { setCelebrityId } from '../../redux/configs/configs.slice'
import { getCelebritieLinkParams } from '../../utils/getCelebritieLinkParams'

const Rankings = () => {
  const [type, setType] = useState('contemporary')
  const dispatch = useDispatch()

  const { rankings, page, handlePage, handleSort, isLoading, isLoadingNext } = useRankings()

  const onClickRankingType = (rankType) => {
    if (type !== rankType) {
      setType(rankType)
      handleSort(rankType)
    }
  }

  return (
    <>
      <Meta title='Who Are the Top 10 Richest People in the World?' desc={'Discover the top celebrity net worth rankings on BillionairesList.com. Get exclusive insights and detailed breakdowns of their wealth and investments.'} />
      <section className='relative mt-24 lg:pb-24 pb-12'>
        <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
          <Image
            src='/images/gradient_light.jpg'
            layout='fill'
            alt='gradient'
            className='h-full w-full'
          />
        </picture>
        {!isLoading ? (
          <div className='container'>
            <div className='mx-auto max-w-2xl pt-16 pb-8 text-center'>
              <HeadLine
                text='Top Celebrities by Net Worth'
                classes='font-display text-center text-5xl animate-gradient'
              />
              <p className='dark:text-jacarta-300 text-lg leading-normal'>
                Checkout the rankings of your favorite celebrities!
              </p>
            </div>

            <div className='flex justify-center space-x-4 mb-16'>
              <div
                onClick={() => onClickRankingType('contemporary')}
                className={cn(
                  'cursor-pointer hover:bg-accent-dark  rounded-full py-3 px-8 text-center font-semibold  transition-all',
                  {
                    ['bg-accent text-white shadow-accent-volume']: type === 'contemporary',
                    ['bg-white text-accent shadow-white-volume hover:shadow-accent-volume hover:text-white']:
                      type !== 'contemporary',
                  },
                )}>
                Present Ranking
              </div>

              <div
                onClick={() => onClickRankingType('historical')}
                className={cn(
                  'cursor-pointer hover:bg-accent-dark  rounded-full py-3 px-8 text-center font-semibold  transition-all',
                  {
                    ['bg-accent text-white shadow-accent-volume']: type === 'historical',
                    ['bg-white text-accent shadow-white-volume hover:shadow-accent-volume hover:text-white']:
                      type !== 'historical',
                  },
                )}>
                Historic Ranking
              </div>
            </div>

            <div className='mb-10 shrink-0 basis-8/12 space-y-5 lg:mb-0 lg:pr-10'>
              {rankings.length &&
                rankings.map(
                  ({ id, profile_image, name, net_worth, present_ranking, description, history_ranking }) => {
                    return (
                      <article onClick={() => dispatch(setCelebrityId(id))}>
                        <Link href={getCelebritieLinkParams(name, id)} key={id}>
                          <a className='dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl relative flex items-center border bg-white p-8 transition-shadow hover:shadow-lg'>
                            <figure className='mr-5 self-start'>
                              <Image
                                src={
                                  profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'
                                }
                                alt={`${name} image`}
                                height={50}
                                width={50}
                                objectFit='cover'
                                className='rounded-2lg'
                                unoptimized
                              />
                            </figure>

                            <div className='w-[80%]'>
                              <h3 className='font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white'>
                                {name}
                              </h3>
                              <span className='dark:text-jacarta-200 text-jacarta-500 mb-3 block text-sm'>
                                ${net_worth && mainNetWorthFormat(net_worth.toString())}
                              </span>
                              <span className='text-jacarta-300 text-xs text-ellipsis overflow-hidden text-ellipsis-2'>
                                {description}
                              </span>
                            </div>

                            <div className='dark:border-jacarta-600 border-jacarta-100 ml-auto rounded-full border p-3'>
                              {type === 'contemporary' ? `Rank #${present_ranking}` : `Rank #${history_ranking}`}
                            </div>
                          </a>
                        </Link>
                      </article>
                    )
                  },
                )}
            </div>
          </div>
        ) : (
          <div className='h-[100vh] w-full flex justify-center items-center'>
            <Loader />
          </div>
        )}
        {page && (
          <div className='text-center mt-10'>
            <button
              onClick={() => handlePage(page)}
              disabled={isLoadingNext}
              className={cn(
                'bg-accent shadow-accent-volume hover:bg-accent-dark inline-block rounded-full py-3 px-8 text-center font-semibold text-white transition-all',
                {
                  ['brightness-75']: isLoadingNext,
                },
              )}>
              {isLoadingNext ? 'Loading..' : 'Load More'}
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default Rankings
