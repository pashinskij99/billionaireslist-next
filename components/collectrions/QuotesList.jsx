/** @format */

import Image from 'next/image'
import Link from 'next/link'
import { getQuotePath } from '../../utils/getQuotePath'

const QuotesList = ({ quotes }) => {
  return (
    <>
      {quotes.map(({ id, name, nationality, profession, quote }) => {
        return (
          <article key={name + id}>
            <div className='dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg height-100'>
              <figure className='relative'>
                <Link href={getQuotePath(name, id)}>
                  <a>
                    <Image
                      src={'/images/Quotes-1024x1024.png'}
                      alt={`${name} quote`}
                      className='w-full rounded-[0.625rem]'
                      loading='lazy'
                      height='100%'
                      width='100%'
                      layout='responsive'
                      objectFit='cover'
                    />
                  </a>
                </Link>
              </figure>
              <div className='mt-7 flex items-center justify-between'>
                <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-blue'>
                  {nationality}, {profession}
                </span>
              </div>
              <div className='mt-2 flex items-center justify-between'>
                <Link href={getQuotePath(name, id)}>
                  <a>
                    <span className='font-display  text-jacarta-700 hover:text-accent text-xl dark:text-white'>
                      {name}
                    </span>
                  </a>
                </Link>
              </div>
              <div className='mt-2 text-base'>
                <span className='dark:text-jacarta-100 text-jacarta-700'>{quote}</span>
              </div>
            </div>
          </article>
        )
      })}
    </>
  )
}

export default QuotesList
