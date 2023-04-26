/** @format */

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { footerMenuList } from '../data/footer_data'
import { mainNetWorthFormat } from '../utils/formatNumber'
import { getDonationList } from '../utils/getDonationList'
import { getSocialIconsList } from '../utils/getSocialIconsList'
import { setCelebrityId } from '../redux/configs/configs.slice'
import { getCelebritieLinkParams } from '../utils/getCelebritieLinkParams'

const Footer = ({celebrities, settings}) => {
  const {
    donation_btc,
    donation_etc,
    donation_usdt,
    donation_doge,
    facebook_link,
    twitter_link,
    tiktok_link,
    instagram_link,
  } = settings

  const dispatch = useDispatch()

  const [isCopied, setIsCopied] = useState()

  const onClickDonation = (text) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <>
      {/* <!-- Footer --> */}

      <footer className='dark:bg-jacarta-900 page-footer bg-white'>
        <div className='container'>
          <div className='grid grid-cols-6 gap-x-7 gap-y-4 md:gap-y-14 pt-12 md:pt-24 pb-12 md:grid-cols-12'>
            <div className='col-span-full md:col-span-4'>
              {/* <!-- Logo --> */}
              <Link href='/'>
                <a className='mb-6 inline-block dark:hidden'>
                  <Image src='/images/logo.svg' width={260} height={120} alt='Billionaires List' />
                </a>
              </Link>

              <Link href='/'>
                <a className=' mb-3 dark:inline-block hidden'>
                  <Image
                    src='/images/logo_white.svg'
                    width={203}
                    height={120}
                    alt='Billionaires List'
                  />
                </a>
              </Link>

              <div className='flex space-x-5'>
                {Object.keys(settings).length ? getSocialIconsList([facebook_link, twitter_link, instagram_link, tiktok_link]).map(
                  (item) => {
                    const { id, href, text } = item
                    return (
                      <Link href={href} key={id}>
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group cursor-pointer'>
                          <svg className='icon group-hover:fill-accent fill-jacarta-300 h-7 w-7 dark:group-hover:fill-white'>
                            <use xlinkHref={`/icons.svg#icon-${text}`}></use>
                          </svg>
                        </a>
                      </Link>
                    )
                  },
                ) : null}
              </div>

              <p className='dark:text-jacarta-300 mb-6 mt-6'>Donations Welcomed</p>

              <div className='flex flex-col'>
                <div className='flex space-x-4'>
                  {getDonationList([donation_btc, donation_etc, donation_usdt, donation_doge]).map(
                    (item) => {
                      const { id, href, text, imgSrc, wallet } = item
                      return (
                        <div
                          key={id}
                          className='cursor-pointer w-8 flex flex-col items-center gap-1'
                          onClick={() => onClickDonation(wallet)}>
                          <Image src={imgSrc} alt={href} width='32' height='32' />
                          <p
                            style={{ fontSize: '8px' }}
                            className='text-center text-tiny text-jacarta-700 dark:text-white leading-3'>
                            {text}
                          </p>
                        </div>
                      )
                    },
                  )}
                </div>

                <div
                  className={`${
                    isCopied ? 'opacity-100' : 'opacity-0'
                  } text-center transition-opacity w-52 p-1 text-sm font-medium mt-3 text-jacarta-700 dark:text-white dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-700 rounded-md border bg-white`}>
                  Address copied to clipboard
                </div>
              </div>
            </div>

            {footerMenuList.map((single) => (
              <div
                className={`md:pl-6 mt-1 md:mt-11 col-span-2 md:col-span-5 ${single.diffClass}`}
                key={single.id}>
                <h3 className='font-display text-jacarta-700 mb-6 text-sm dark:text-white'>
                  {single.title}
                </h3>
                <ul className='dark:text-jacarta-300 flex flex-col space-y-1'>
                  {single.list.map((item) => {
                    const { id, href, text } = item
                    return (
                      <li key={id}>
                        <Link href={href}>
                          <a className='hover:text-accent dark:hover:text-white'>{text}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

            <div className='md:pl-6 mt-1 md:mt-11 col-span-4 md:col-span-3'>
              <h3 className='font-display text-jacarta-700 mb-6 text-sm dark:text-white'>
                Newest Celebrities
              </h3>
              <ul className='dark:text-jacarta-300 flex flex-col space-y-2'>
                {celebrities.map(({ id, profile_image, name, net_worth }) => (
                  <Link key={id} href={getCelebritieLinkParams(name, id)}>
                    <div onClick={() => dispatch(setCelebrityId(id))}>
                      <li className='py-3 px-3 flex items-center group cursor-pointer border rounded-2xl dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 transition-shadow hover:shadow-lg'>
                        <div className='w-[50px] h-[50px] relative'>
                          <Image
                            src={
                              profile_image || '/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'
                            }
                            className='rounded-full cursor-pointer'
                            alt={`${name} photo`}
                            layout='fill'
                            objectFit='cover'
                            unoptimized
                          />
                        </div>
                        <div className='ml-4'>
                          <h4 className='font-bold text-base mb-3 duration-100 group-hover:text-accent-lighter cursor-pointer'>
                            {name}
                          </h4>

                          <p className='text-sm text-ellipsis overflow-hidden text-ellipsis-2'>
                            ${mainNetWorthFormat(net_worth)}
                          </p>
                        </div>
                      </li>
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0'>
            <span className='dark:text-jacarta-400 text-sm'>
              <span>Copyright {new Date().getFullYear()} - </span>
              <Link href='/'>
                <a className='hover:text-accent dark:hover:text-white'> Billionaireslist.com</a>
              </Link>
            </span>

            <ul className='dark:text-jacarta-400 flex flex-wrap space-x-4 text-sm'>
              <li>
                <Link href='/terms-of-use'>
                  <a className='hover:text-accent dark:hover:text-white'>Terms and conditions</a>
                </Link>
              </li>
              <li>
                <Link href='/privacy-policy'>
                  <a className='hover:text-accent dark:hover:text-white'>Privacy policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
