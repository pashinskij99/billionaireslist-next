import React, { useState } from 'react'

const CategoryDropDown = ({ categories, changeParams }) => {
  const [activeValue, setActiveValue] = useState(categories[0].value)
  const [categoryDropdown, setCategoryDropdown] = useState(false)

  const handleCategoryDropdown = () => {
    window.addEventListener('click', (w) => {
      if (w.target.closest('.category-dropdown')) {
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
    if (value !== activeValue) {
      setActiveValue(value)
      changeParams('sort', value)
    }
  }

  return (
    <div className='relative'>
      <button
        className='group dropdown-toggle category-dropdown dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent hover:bg-accent border-jacarta-100 font-display text-jacarta-700 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white'
        onClick={handleCategoryDropdown}>
        <span className='-mb-1'>
          Sort by: {categories.find((el) => el.value === activeValue).name}
        </span>
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
            ? 'dropdown-menu dark:bg-jacarta-800 z-10 min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl show absolute top-full right-0'
            : 'dropdown-menu dark:bg-jacarta-800 z-10 min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden absolute top-full right-0'
        }>
        <ul className='flex flex-col flex-wrap'>
          {categories.map(({ value, name }) => {
            return (
              <li key={value} onClick={() => changeHandler(value)}>
                <button className='dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white'>
                  <span className='text-jacarta-700 dark:text-white'>{name}</span>
                  {activeValue === value && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      className='fill-accent mb-[3px] h-4 w-4'>
                      <path fill='none' d='M0 0h24v24H0z'></path>
                      <path d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'></path>
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CategoryDropDown
