import Image from 'next/image'
import React, { memo } from 'react'
import { TabPanel, Tabs } from 'react-tabs'
import SearchInput from '../inputs/SearchInput'
import OfferTab from '../tabs/OfferTab'

const NumbersTable = memo(
  ({
    data,
    columns,
    title,
    subtitle,
    page,
    handlePage,
    searchTerm,
    handleSearch,
    isLoadingNext,
  }) => {
    return (
      <section className='relative py-24'>
        <div className='container'>
          <div className='scrollbar-custom overflow-x-auto rounded-lg'>
            <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
              <Image
                src='/images/gradient.jpg'
                alt='gradient'
                className='h-full w-full'
                layout='fill'
              />
            </picture>
            <picture className='pointer-events-none absolute inset-0 -z-10 hidden dark:block'>
              <Image
                src='/images/gradient_dark.jpg'
                alt='gradient dark'
                className='h-full w-full'
                layout='fill'
              />
            </picture>
            <h2 className='font-display text-jacarta-500 text-center text-1xl dark:text-white'>
              {subtitle}
            </h2>
            <h2 className='font-display text-jacarta-700 mb-16 text-center text-3xl dark:text-white'>
              {title}
            </h2>{' '}
            <SearchInput value={searchTerm} onChange={handleSearch} classes='w-full md:w-[40%]' />
            <Tabs className='min-w-fit tabs'>
              <TabPanel className='tab-content'>
                <OfferTab
                  columns={columns}
                  data={data}
                  page={page}
                  handlePage={handlePage}
                  isLoading={isLoadingNext}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    )
  },
)

export default NumbersTable
