import { useRouter } from 'next/router'
import { useState } from 'react'
import cn from 'classnames'
import Loader from '../preloader/Loader'

const TagsDropdown = ({ tags, isLoading }) => {
  const { push, query } = useRouter()

  const [categoryDropdown, setCategoryDropdown] = useState(false)

  const handleCategoryDropdown = () => {
    window.addEventListener('click', (w) => {
      if (w.target.closest('.category-dropdown-tags')) {
        if (categoryDropdown) {
          setCategoryDropdown(false)
        } else {
          setCategoryDropdown(true)
        }
      } else {
        setCategoryDropdown(false)
      }
    })
  }

  const changeHandler = (value) => {
    if (query.tag !== value) {
      push(`/celebrities-quotes?tag=${value}`)
    }
  }

  const clearTag = () => {
    push('/celebrities-quotes')
  }

  return (
    <div className='relative'>
      <button
        className='group dropdown-toggle category-dropdown-tags dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent hover:bg-accent border-jacarta-100 font-display text-jacarta-700 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white'
        onClick={handleCategoryDropdown}>
        <span className='-mb-1'>Tag by: {query.tag}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          className='fill-jacarta-500 h-4 w-4 dark:fill-white ml-1 mt-[2px]'>
          <path fill='none' d='M0 0h24v24H0z'></path>
          <path d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'></path>
        </svg>
      </button>

      <div
        className={
          categoryDropdown
            ? 'dropdown-menu dark:bg-jacarta-800 z-10 min-w-[370px] max-w-[440px] whitespace-nowrap rounded-xl mt-2 bg-white text-left shadow-xl show absolute top-full left-[80%] lg:right-3'
            : 'dropdown-menu dark:bg-jacarta-800 z-10 min-w-[370px] max-w-[440px] whitespace-nowrap rounded-xl mt-2 bg-white text-left shadow-xl hidden absolute top-full left-[80%] lg:right-3'
        }>
        <div className='py-4 px-6 text-jacarta-700 dark:text-white bg-light-base dark:bg-transparent'>
          <h3 className='text-xl font-bold mb-7 animate-gradient text-center'>Tag Cloud</h3>
          {query.tag && (
            <div className='flex justify-end'>
              <p
                onClick={clearTag}
                className='text-accent hover:text-accent-dark cursor-pointer duration-100'>
                Clear
              </p>
            </div>
          )}
          {!isLoading ? (
            <div className='flex flex-wrap gap-3'>
              {tags.map(({ id, name }) => (
                <div
                  className={cn(
                    'px-6 py-3 inline-block shadow-base rounded-3xl text-sm cursor-pointer duration-100 text-jacarta-700 dark:text-white hover:bg-accent hover:text-white bg-white dark:bg-jacarta-600 dark:hover:bg-white dark:hover:text-jacarta-700',
                    {
                      ['!bg-white !text-jacarta-700 !dark:text-white !dark:bg-jacarta-600']:
                        name === query.tag,
                    },
                  )}
                  key={id}
                  onClick={() => changeHandler(name)}>
                  {name}
                </div>
              ))}
            </div>
          ) : (
            <div className='h-[100%] w-full flex justify-center items-center'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TagsDropdown
