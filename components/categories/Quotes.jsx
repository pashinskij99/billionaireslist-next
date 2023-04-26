/** @format */

import React from 'react'
import HeadLine from '../headLine'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Link from 'next/link'

import 'tippy.js/themes/light.css'

const Quotes = ({ quotes }) => {
  const { push } = useRouter()
  return (
    <div>
      <section className='py-24'>
        <div className='container'>
          <HeadLine
            text='Quotes'
            classes='font-display mb-4 text-center text-6xl animate-gradient'
          />
          <HeadLine
            text='Discover what your favorite celebrities say'
            classes='font-display mb-10 text-center text-md text-jacarta-base dark:text-white'
          />
          <div className='grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4'>
            {quotes.map(({ id, name, nationality, profession, quote }) => {
              return (
                <article key={id}>
                  <div className='dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg height-100'>
                    <figure className='relative'>
                      <Link href={`quote/${id}`}>
                        <a>
                          <Image
                            src={'/images/Quotes-1024x1024.png'}
                            alt='item 8'
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
                    </figure>
                    <div className='mt-7 flex items-center justify-between'>
                      <span className='font-display text-jacarta-700 hover:text-accent text-base dark:text-blue'>
                        {nationality}, {profession}
                      </span>
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                      <Link href={`quote/${id}`}>
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
          </div>

          <div className='mt-10 text-center'>
            <button
              onClick={() => push('/celebrities-quotes')}
              className='bg-accent shadow-accent-volume hover:bg-accent-dark inline-block rounded-full py-3 px-8 text-center font-semibold text-white transition-all'>
              See All
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Quotes
