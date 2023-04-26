import React, { useState, useEffect } from 'react'

import Meta from '../../components/Meta'
import BlogList from '../../components/blog/BlogList'
import HeadLine from '../../components/headLine'

import { DefaultService } from '../../services/default.service'
import Loader from '../../components/preloader/Loader'

const Blog = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [nextPage, setNextPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage])

  const handlePage = async () => {
    const { data } = await DefaultService.getPosts({
      page: page,
    })
    setPage(data.pagination.next_page)
    setData((prev) => [...prev, ...data.posts])
  }

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await DefaultService.getPosts()
      setData(data.posts)
      setNextPage(data.pagination.next_page)
      setIsLoading(false)
    }
    getPosts()
  }, [])

  return (
    <>
      <Meta title='News & Articles about Billionaires' desc={'Stay up-to-date with the latest news and insights on celebrity net worth, business success stories, and more. Visit our blog on billionaireslist.com now.'} />
      {isLoading 
        ? (<div className='h-[100vh] w-full flex justify-center items-center'>
            <Loader />
          </div>)
        : <ContentPage nextPage={nextPage} handlePage={handlePage} data={data} />
      }
    </>
  )
}

const ContentPage = ({nextPage, handlePage, data}) => {
  return (
    <>
    <section className='relative  pt-[5.5rem] lg:pt-24'>
        <div className='py-16 md:py-24'>
          <div className='container'>
            <div className='mx-auto max-w-2xl pb-16 text-center'>
              <HeadLine
                text='Blog'
                classes='font-display mb-4 text-center text-6xl animate-gradient mb-5'
              />
              <h3 className=' text-lg font-display text-jacarta-700 text-center dark:text-white'>
                Take A Break And Read All About It
              </h3>
            </div>
            <BlogList data={data} />
          </div>
        </div>

        {nextPage && (
          <div className='text-center'>
            <button
              onClick={() => handlePage()}
              className='bg-accent shadow-accent-volume hover:bg-accent-dark inline-block rounded-full py-3 px-8 text-center font-semibold text-white transition-all'>
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default Blog
