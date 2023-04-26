import Link from 'next/link'
import Image from 'next/image'
import {memo, useEffect} from 'react'
import { mainNetWorthFormat } from '../../utils/formatNumber'
import {setCelebrityId} from "../../redux/configs/configs.slice";
import {useDispatch} from "react-redux";
import { getCelebritieLinkParams } from '../../utils/getCelebritieLinkParams';

const CelebritiesList = memo(({ data }) => {
  const dispatch = useDispatch()

  return (
    <>
      {data?.map(({ id, profile_image, name, present_ranking, net_worth }) => {
        return (
          <article key={id}>
            <div className='dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg'>
              <figure className='relative'>
                <article onClick={() => dispatch(setCelebrityId(id))}>
                  <Link href={getCelebritieLinkParams(name, id)}>
                  <a>
                    <Image
                      src={profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'}
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
                </Link>
                </article>
              </figure>
              <div className='mt-7 flex items-center justify-between'>
                <article onClick={() => dispatch(setCelebrityId(id))}>
                  <Link href={getCelebritieLinkParams(name, id)}>
                    <a>
                      <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-white'>
                        {name}
                      </span>
                    </a>
                  </Link>
                </article>
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
          </article>
        )
      })}
    </>
  )
})

export default CelebritiesList
