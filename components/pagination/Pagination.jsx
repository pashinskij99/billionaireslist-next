import { useState } from 'react'
import cn from 'classnames'

import { DOTS, usePagination } from './usePagination'

const Pagination = ({ handlePage, page, total, pageSize }) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: total,
    siblingCount: 1,
    pageSize,
  })

  if (page === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    handlePage(page + 1)
  }

  const onPrevious = () => {
    handlePage(page - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul className='flex justify-center items-center mt-10 gap-4'>
      <li
        className={cn(
          'h-9 w-9 border-2 flex items-center justify-center border-transparent cursor-pointer group',
          {
            ['pointer-events-none']: page === 1,
          },
        )}
        onClick={onPrevious}>
        <div
          className={cn(
            'w-2 h-2 border-r-2 border-t-2 border-white rotate-[-135deg] group-hover:border-accent',
            {
              ['border-jacarta-500']: page === 1,
            },
          )}
        />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={Math.random()}
              className='h-9 w-9 border-2 border-transparent text-jacarta-700 dark:text-white flex items-center justify-center cursor-pointer font-medium text-md'>
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={pageNumber}
            className={cn(
              'h-9 w-9 border-2 text-jacarta-700 dark:text-white flex items-center transition-all justify-center cursor-pointer hover:text-accent dark:hover:text-accent font-medium text-md rounded-md',
              {
                ['dark:border-white border-jacarta-10 border-accent text-accent']:
                  pageNumber === page,
                ['border-transparent']: pageNumber !== page,
              },
            )}
            onClick={() => handlePage(pageNumber)}>
            {pageNumber}
          </li>
        )
      })}
      <li
        onClick={onNext}
        className={cn(
          'h-9 w-9 border-2 flex items-center justify-center border-transparent cursor-pointer group',
          {
            ['pointer-events-none']: page === lastPage,
          },
        )}>
        <div
          className={cn(
            'w-2 h-2 border-r-2 border-t-2 border-white rotate-[45deg] group-hover:border-accent',
            {
              ['border-jacarta-500']: page === lastPage,
            },
          )}
        />
      </li>
    </ul>
  )
}

export default Pagination
