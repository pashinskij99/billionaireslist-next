/** @format */

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Meta from '../components/Meta'

const Error_page = () => {
  return (
    <div>
      <Meta title='404 | Billionaires List' />
      <div className='pt-[5.5rem] lg:pt-24'>
        {/* <!-- 404 --> */}
        <section className='dark:bg-jacarta-800 relative py-16 md:py-24'>
          <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
            <Image
              src='/images/gradient_light.jpg'
              alt='gradient'
              width={1920}
              height={789}
              unoptimized
            />
          </picture>

          <div className='container'>
            <div className='mx-auto max-w-lg text-center relative'>
              <span className='text-[220px] md:text-[350px] mx-auto absolute md:left-0 left-[50%] top-0 leading-[1] md:translate-x-[-30%] translate-x-[-50%] opacity-[.3] font-display'>
                404
              </span>
              <span className='mb-14 inline-block relative z-[1]'>
                <img
                  className='md:w-96 md:h-80 w-60 h-52'
                  src='/images/error-404.png' 
                  alt='gradient'
                />
              </span>
              <h1 className='text-jacarta-700 font-display mb-3 text-4xl dark:text-white md:text-6xl'>
                Page Not Found
              </h1>
              <p className='dark:text-jacarta-300 mb-8 md:text-lg text-sm leading-normal text-center'>
                The page you are looking for might have been moved , renamed or might never existed
              </p>
              <Link href='/'>
                <a className='text-[16px] border border-1 border-accent bg-accent hover:bg-transparent inline-block rounded-md py-3 px-8 text-center font-semibold text-white transition-all'>
                  Back to Homepage
                </a>
              </Link>
            </div>
          </div>
        </section>
        {/* <!-- end 404 --> */}
      </div>
    </div>
  )
}

export default Error_page
