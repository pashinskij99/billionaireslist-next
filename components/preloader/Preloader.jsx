import Image from 'next/image'
import { useEffect } from 'react'
import Loader from './Loader'

const Preloader = () => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('body').classList.add('page-loaded')
    }, 1500)
  }, [])

  return (
    <div className='preloader bg-light-base dark:bg-jacarta-700'>
      <div className='dark:inline-block hidden'>
        <Image src='/images/logo_white.svg' width={340} height={160} alt='Billionaires List Logo' />
      </div>
      <div className='dark:hidden inline-block'>
        <Image src='/images/logo.svg' width={340} height={160} alt='Billionaires List Logo' />
      </div>
      <Loader />
    </div>
  )
}

export default Preloader
