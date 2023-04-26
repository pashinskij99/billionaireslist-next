import { memo, useMemo } from 'react'
import cn from 'classnames'
import { mainNetWorthFormat } from '../../utils/formatNumber'

const OfferTab = memo(({ columns, data, handlePage, page, isLoading }) => {

  if(columns[0].dataField === 'age') {
    console.log({data})

    useMemo(() => data?.sort((a, b) => parseInt(a.age) - parseInt(b.age)), [data])
  }

  const convertMoreHundred = (string) => String(parseInt(string)) + '+'
  

  return (
    <>
      {/* <!-- Offers --> */}
      <div
        className='tab-pane fade show active'
        id='offers'
        role='tabpanel'
        aria-labelledby='offers-tab'>
        <div
          role='table'
          className={cn(
            `scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 grid max-h-[364px] w-full overflow-y-auto rounded-lg rounded-tl-none border bg-white text-sm dark:text-white`,
            {
              ['grid-cols-3']: columns.length === 3,
              ['grid-cols-4']: columns.length === 4,
            },
          )}>
          <div className='contents' role='row'>
            {columns.map(({ name }) => (
              <div
                key={name}
                className='dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4'
                role='columnheader'>
                <span className='text-jacarta-700 dark:text-jacarta-100 text-xs md:text-base w-full overflow-hidden text-ellipsis'>
                  {name}
                </span>
              </div>
            ))}
          </div>
          {data?.length &&
            data?.map((item, id) => {
              return (
                <div className='contents' role='row' key={id}>
                  {columns.map(({ dataField }) => {
                    if (dataField === 'total' || dataField === 'avg') {
                      return (
                        <div
                          key={dataField}
                          className='dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap border-t p-2 py-4 md:p-4 overflow-x-auto'
                          role='cell'>
                          <span className='text-xs md:text-base'>
                            ${mainNetWorthFormat(item[dataField])}
                          </span>
                        </div>
                      )
                    } else if(dataField === 'age') {
                      return (
                        <div
                          key={dataField}
                          className='dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap border-t p-2 py-4 md:p-4 overflow-x-auto'
                          role='cell'>
                          <span className='text-xs md:text-base'>{
                            parseInt(item[dataField]) !== 100 
                              ? item[dataField] 
                              : convertMoreHundred(item[dataField])
                            }</span>
                        </div>
                      )
                    } else {
                      return (
                        <div
                          key={dataField}
                          className='dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap border-t p-2 py-4 md:p-4 overflow-x-auto'
                          role='cell'>
                          <span className='text-xs md:text-base'>{item[dataField]}</span>
                        </div>
                      )
                    }
                  })}
                </div>
              )
            })}
        </div>

        {page && (
          <div className='text-center mt-10'>
            <button
              onClick={() => handlePage(page)}
              disabled={isLoading}
              className={cn(
                'bg-accent shadow-accent-volume hover:bg-accent-dark inline-block rounded-full py-3 px-8 text-center font-semibold text-white transition-all',
                {
                  ['brightness-75']: isLoading,
                },
              )}>
              {isLoading ? 'Loading..' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </>
  )
})

export default OfferTab
