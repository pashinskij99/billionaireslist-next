/** @format */

import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Meta from '../../components/Meta'
import Loader from '../../components/preloader/Loader'
import { QuotesService } from '../../services/quotes.service'
import { getQuotePath } from '../../utils/getQuotePath'
import { takeIdFromUrlQuote } from '../../utils/takeIdFromUrlQuote'
import { useRouter } from 'next/router'

export async function getServerSideProps(ctx) {
  const idQuote = takeIdFromUrlQuote(ctx.query.id)

  const { data } = await QuotesService.getQuoteById(idQuote)

  return {
    props: {
      id: idQuote,
      quote: data
    }
  }
}

const BlogPage = ({ id, quote }) => {
  const [related, setRelated] = useState([])
  const [popular, setPopular] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getQuote = async () => {
      const { data: popular } = await QuotesService.getPopularQuotes()
      const { data: related } = await QuotesService.getQuotes({
        nationality: quote.profession,
        perPage: 2,
      })

      setRelated(related.quotes)
      setPopular(popular)
      setIsLoading(false)
    }
    getQuote()
  }, [id])

  return (
    <>
      <Meta
        title={`${quote.name} Best Quotes on billionaireslist.com.`}
        desc={`Discover all the best quotes of ${quote.name}, the great ${quote.nationality} ${quote.profession}. Get inspired by a quote about ${quote.tags[0]?.name} and ${quote.tags[1]?.name}.`}
      />

      {isLoading
        ? (<div className='h-[100vh] w-full flex justify-center items-center'>
            <Loader />
          </div>)
        : <ContentPage quote={quote} related={related} popular={popular} />
      }
    </>
  )
}

const ContentPage = ({quote, related, popular}) => {
  const {push} = useRouter()
  
  const submitSearch = (e) => {
    e.preventDefault()
    push(`/quotes?search=${e.target[0].value}`)
  }

  const onClickTag = (name) => {
    push(`/celebrities-quotes?tag=${name}`)
  }

  return (
    <div>
      <picture className='pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden'>
        <img className='h-full w-full' src='/images/gradient.jpg' alt='gradient' />
      </picture>
      <picture className='pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block'>
        <img className='h-full w-full' src='/images/gradient_dark.jpg' alt='gradient dark' />
      </picture>
      <section className='relative  pt-[5.5rem] lg:pt-24'>
        <div className='py-16 md:py-24'>
          <div className='container'>
            <div className='flex flex-col lg:flex-row gap-8'>
              <div className='flex flex-col w-full lg:w-2/3'>
                <div className='px-11 pb-10 border dark:border-jacarta-300 border-jacarta-200 rounded-2xl w-full'>
                  <div className='flex items-center flex-wrap mb-6 text-sm pt-5 py-5 border-b dark:border-jacarta-300 border-b-jacarta-200 gap-3 font-medium text-jacarta-700 dark:text-white'>
                    <div className='flex items-center group gap-3 dark:hover:text-accent-light hover:text-accent-light'>
                      <Image
                        src='https://secure.gravatar.com/avatar/?s=96&d=mm&r=g'
                        alt='admin image'
                        className='rounded-full'
                        width={50}
                        height={50}
                        unoptimized
                      />
                      <Link href='#'>
                        <a className='duration-75'>admin</a>
                      </Link>
                    </div>
                    <span className='text-accent font-bold'>•</span>
                    <span>{quote?.created && format(new Date(quote?.created), 'dd/MM/y')}</span>
                    <span className='text-accent font-bold'>•</span>
                    <span>No Comments</span>
                    <span className='text-accent font-bold'>•</span>
                    <div>
                      <Link href='#'>
                        <a className='duration-75 dark:hover:text-accent-light hover:text-accent-light'>
                          {quote.profession}
                        </a>
                      </Link>
                      ,{' '}
                      <Link href='#href'>
                        <a className='duration-75 dark:hover:text-accent-light hover:text-accent-light'>
                          {quote.nationality}
                        </a>
                      </Link>
                    </div>
                  </div>

                  <h1 className='my-9 text-5xl font-bold text-jacarta-700 dark:text-white'>
                    {quote.name}
                  </h1>

                  <p className='text-base text-jacarta-700 dark:text-white'>
                    {quote.date_of_birth} – {quote.date_of_death}
                  </p>

                  <p className='text-base mt-14 mb-10 text-jacarta-700 dark:text-white'>
                    {quote.quote}
                  </p>

                  <div className='flex flex-wrap gap-3'>
                    {quote?.tags &&
                      quote.tags.map(({ id, name }) => (
                        <div
                          className='px-6 py-3 inline-block shadow-base rounded-3xl text-sm cursor-pointer duration-100 text-jacarta-700 dark:text-white hover:bg-accent hover:text-white dark:bg-jacarta-600 dark:hover:bg-white dark:hover:text-jacarta-700'
                          key={id}>
                          {name}
                        </div>
                      ))}
                  </div>
                </div>

                <div className='w-full mt-14'>
                  <h2 className='font-bold text-4xl animate-gradient'>Related Quotes</h2>

                  <div className='mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5'>
                    {related.length &&
                      related.map(({ id, name, nationality, profession, quote }) => (
                        <div
                          key={id}
                          className='flex flex-col border rounded-2xl dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 transition-shadow hover:shadow-lg'>
                          <Link href={getQuotePath(name, id)}>
                            <a className='h-64'>
                              <img
                                className='w-full h-full object-cover rounded-t-2xl'
                                src='/images/Quotes-1024x1024.png'
                              />
                            </a>
                          </Link>
                          <div className='flex flex-col py-11 px-9'>
                            <h3 className='text-xl font-bold text-jacarta-700 dark:text-white duration-100 dark:hover:text-accent-light hover:text-accent-light cursor-pointer'>
                              {name}
                            </h3>
                            <div className='flex items-center flex-wrap mb-6 text-sm pt-5 py-5 border-b dark:border-jacarta-300 border-b-jacarta-200 gap-3 font-medium text-jacarta-700 dark:text-white'>
                              <Link href='#'>
                                <a className='duration-100 dark:hover:text-accent-light hover:text-accent-light'>
                                  admin
                                </a>
                              </Link>
                              <span className='text-accent font-bold'>•</span>
                              <span>
                                {profession}, {nationality}
                              </span>
                            </div>
                            <p className='text-base text-jacarta-700 dark:text-white'>{quote}</p>
                            <Link href={`/quote/${id}`}>
                              <div className='flex group pl-3 items-center overflow-hidden justify-between mt-9 border rounded-md dark:border-jacarta-200 border-jacarta-100 text-jacarta-700 dark:text-white text-sm font-medium h-11 w-32 duration-100 cursor-pointer dark:hover:border-accent-light dark:hover:text-accent-light hover:border-accent hover:text-accent'>
                                Read More
                                <div className='h-full w-9 flex items-center justify-center border duration-100 bg-jacarta-200 border-jacarta-200 dark:group-hover:bg-accent group-hover:bg-accent dark:group-hover:border-accent group-hover:border-accent'>
                                  <svg className='icon fill-white h-5 w-5 dark:group-hover:fill-white -rotate-90'>
                                    <use xlinkHref={`/icons.svg#icon-down-arrow`}></use>
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-1/3 flex flex-col gap-12'>
                <form onSubmit={submitSearch} className='relative mt-5 lg:mt-0'>
                  <input
                    type='search'
                    className='w-full text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white'
                    placeholder='Search'
                  />
                  <button
                    type='submit'
                    className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width={24}
                      height={24}
                      className='fill-jacarta-500 h-4 w-4 dark:fill-white'>
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' />
                    </svg>
                  </button>
                </form>

                <div className='py-8 px-11 border rounded-2xl dark:border-jacarta-300 border-jacarta-200 text-jacarta-700 dark:text-white bg-light-base dark:bg-transparent'>
                  <h3 className='text-xl font-bold mb-7 animate-gradient text-center'>
                    Popular quotes
                  </h3>

                  {popular.length &&
                    popular.map(({ id, name, quote }) => (
                      <div
                        key={id}
                        className='py-5 px-5 group mb-5 border rounded-2xl dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 transition-shadow hover:shadow-lg'>
                        <Link href={getQuotePath(name, id)}>
                          <a className='flex'>
                            <div className='min-w-[70px] h-[70px] relative'>
                              <Image
                                src='/images/Quotes-150x150.png'
                                className='rounded-full cursor-pointer'
                                alt='quote'
                                layout='fill'
                                unoptimized
                              />
                            </div>
                            <div className='ml-4 w-[167px]'>
                              <h4 className='font-bold text-base mb-5 duration-100 group-hover:text-accent-lighter cursor-pointer'>
                                {name}
                              </h4>

                              <p className='text-xs text-ellipsis overflow-hidden text-ellipsis-2'>
                                {quote}
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                    ))}
                </div>

                <div className='py-8 px-11 border rounded-2xl dark:border-jacarta-300 border-jacarta-200 text-jacarta-700 dark:text-white bg-light-base dark:bg-transparent'>
                  <h3 className='text-xl font-bold mb-7 animate-gradient text-center'>Tag Cloud</h3>
                  <div className='flex flex-wrap gap-3'>
                    {quote.tags.map(({ name, id }) => (
                      <div
                        className='px-6 py-3 inline-block shadow-base rounded-3xl text-sm cursor-pointer duration-100 text-jacarta-700 dark:text-white hover:bg-accent hover:text-white bg-white dark:bg-jacarta-600 dark:hover:bg-white dark:hover:text-jacarta-700'
                        key={id}
                        onClick={() => onClickTag(name)}>
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
