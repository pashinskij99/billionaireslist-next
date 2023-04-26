import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'

import DarkMode from '../mode/DarkMode'
import { useEffect, useState } from 'react'
import { getGeneralCategoryPath, getSubcategoryPath } from '../../utils/getSubcategoryPath'
import { useRouter } from 'next/router'
import { navigationAdditionalLinks } from '../../data/navData'

export default function Header01({categories}) {
  const [toggle, setToggle] = useState(false)
  const [isCollapse, setCollapse] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  const { query, push, route, asPath } = useRouter()

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        setToggle(false)
      }
    })
  })

  const mobileCollapse = (id) => {
    if (isCollapse === id) {
      return setCollapse(null)
    }
    setCollapse(id)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    push(`/listings?search=${e.target[0].value}`)
    setSearchValue('')
  }

  return (
    <>
      {/* main desktop menu sart*/}
      <header className='js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors'>
        <div className='flex items-center px-6 xl:px-12 '>

          <Link href='/'>
            <a className='dark:hidden inline-block'>
              <Image src='/images/logo.svg' width={260} height={120} alt='Billionaires List Logo' />
            </a>
          </Link>

          <Link href='/'>
            <a className='dark:inline-block hidden'>
              <Image
                src='/images/logo_white.svg'
                width={260}
                height={120}
                alt='Billionaires List Logo'
              />
            </a>
          </Link>
          {/* End  logo */}

          <form
            action='search'
            onSubmit={submitSearch}
            className='relative ml-12 mr-8 hidden basis-2/12 lg:block xl:ml-[2%]'>
            <input
              type='search'
              className='text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white'
              placeholder='Search'
              value={searchValue}
              onChange={(e) => {setSearchValue(e.target.value)}}
            />
            <span className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width={24}
                height={24}
                className='fill-jacarta-500 h-4 w-4 dark:fill-white'>
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' />
              </svg>
            </span>
          </form>
          {/* End Desktop search form */}

          <div className='js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent'>
            <nav className='navbar w-full'>
              <ul className='flex flex-col lg:flex-row'>
                {categories.map((category) => (
                  <li key={category.id} className='js-nav-dropdown group relative'>
                    <button
                      className={cn(
                        'dropdown-toggle text-jacarta-700 font-display hover:text-accent dark:hover:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full',
                        {
                          ['!text-accent trulala']: asPath === getGeneralCategoryPath(category.id),
                        },
                      )}>
                      <Link href={getSubcategoryPath(category.id)}>
                        <span>{category.name}</span>
                      </Link>
                      <i className='lg:hidden'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          width={24}
                          height={24}
                          className='h-4 w-4 dark:fill-white'>
                          <path fill='none' d='M0 0h24v24H0z' />
                          <path d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z' />
                        </svg>
                      </i>
                    </button>
                    <ul className='dropdown-menu dark:bg-jacarta-800 left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 relative'>
                      {category.subcategories?.map((subcategory) => (
                        <li key={subcategory.id}>
                          <Link href={getSubcategoryPath(subcategory.id)}>
                            <a className='dark:hover:bg-jacarta-600 hover:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors justify-between '>
                              <span
                                className={cn(`font-display text-sm`, {
                                  'text-accent': query?.category === subcategory.id.toString(),
                                  'text-jacarta-700 dark:text-white':
                                    query?.category !== subcategory.id.toString(),
                                })}>
                                {subcategory.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}

                {navigationAdditionalLinks.map(({ id, link, name }) => (
                  <li key={id}>
                    <Link href={link}>
                      <a
                        className={cn(
                          'text-jacarta-700 font-display hover:text-accent dark:hover:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full',
                          {
                            ['!text-accent']: link === route,
                          },
                        )}>
                        <span>{name}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* End menu for desktop */}

            <div className='ml-8 hidden items-center lg:flex xl:ml-12'>
              <div className='js-nav-dropdown group-dropdown relative'></div>
              <DarkMode />
            </div>
            {/* End header right content (metamask and other) for desktop */}
          </div>
          {/* header menu conent end for desktop */}

          <div className='ml-auto flex lg:hidden'>
            <DarkMode />
            <button
              className='js-mobile-toggle border-jacarta-100 hover:bg-accent dark:hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
              aria-label='open mobile menu'
              onClick={() => setToggle(true)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width={24}
                height={24}
                className='fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'>
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z' />
              </svg>
            </button>
          </div>
          {/* End header right content  for mobile */}
        </div>
        {/* End flex item */}
      </header>
      {/* main desktop menu end */}

      {/* start mobile menu and it's other materials  */}
      <div
        className={`lg:hidden js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-20 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent ${
          toggle ? 'nav-menu--is-open' : 'hidden'
        }`}>
        <div className='t-0 dark:bg-jacarta-800 fixed left-0 z-10 flex w-full items-center justify-between bg-white pb-6 px-6 lg:hidden'>
          <div className='dark:hidden'>
            <Image
              src='/images/logo.svg'
              width={203}
              height={93.69}
              alt='Billionaires List'
              className='max-h-7 h-auto '
            />
          </div>

          <div className='hidden dark:block'>
            <Image
              src='/images/logo_white.svg'
              width={203}
              height={93.69}
              alt='Billionaires List Logo'
            />
          </div>

          <button
            className='js-mobile-close border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]'
            onClick={() => setToggle(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width={24}
              height={24}
              className='fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white'>
              <path fill='none' d='M0 0h24v24H0z' />
              <path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
            </svg>
          </button>
        </div>
        {/* mobile menu top header content */}

        <form
          onSubmit={submitSearch}
          action='search'
          className='relative mt-40 mb-8 w-full lg:hidden'>
          <input
            type='search'
            className='text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-3 px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white'
            placeholder='Search'
          />
          <span className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width={24}
              height={24}
              className='fill-jacarta-500 h-4 w-4 dark:fill-white'>
              <path fill='none' d='M0 0h24v24H0z' />
              <path d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' />
            </svg>
          </span>
        </form>
        {/* End search form mobile menu  */}

        <nav className='navbar w-full'>
          <ul className='flex flex-col lg:flex-row'>
            {categories.map(({ id, name, subcategories }) => (
              <li key={id} className='js-nav-dropdown group relative'>
                <button
                  onClick={() => mobileCollapse(id)}
                  className='dropdown-toggle text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full'>
                  <span>{name}</span>
                  <i className='lg:hidden'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width={24}
                      height={24}
                      className='h-4 w-4 dark:fill-white'>
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z' />
                    </svg>
                  </i>
                </button>

                <ul
                  className={`dropdown-menu dark:bg-jacarta-800 left-0 top-[85%] z-10 min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 relative ${
                    isCollapse === id ? 'block' : 'hidden'
                  }`}>
                  {subcategories?.map(({ id, name }) => (
                    <li key={id} onClick={() => setToggle(false)}>
                      <Link href={getSubcategoryPath(id)}>
                        <a className='dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors justify-between'>
                          <span className={`font-display text-sm dark:text-white`}>{name}</span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {navigationAdditionalLinks.map(({ id, link, name }) => (
              <li key={id} onClick={() => setToggle(false)}>
                <Link href={link}>
                  <a className='text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full'>
                    <span>{name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* End navbar mobile menu  */}

        <div className='mt-10 w-full lg:hidden'>
          {/* <div className='js-wallet bg-accent shadow-accent-volume hover:bg-accent-dark block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all'>
            MetaMask not available :
          </div> */}
          <hr className='dark:bg-jacarta-600 bg-jacarta-100 my-5 h-px border-0' />
          <div className='flex items-center justify-center space-x-5'>
            <a className='group'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='facebook'
                className='group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'>
                <path d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' />
              </svg>
            </a>
            <a className='group'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='twitter'
                className='group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'>
                <path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' />
              </svg>
            </a>
            <a className='group'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='instagram'
                className='group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 448 512'>
                <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
              </svg>
            </a>
            <a className='group'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='tiktok'
                className='group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 448 512'>
                <path d='M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z' />
              </svg>
            </a>
          </div>
        </div>
        {/* mt-10 w-full lg:hidden */}
      </div>
      {/* End mobile menu and it's other materials */}
    </>
  )
}
