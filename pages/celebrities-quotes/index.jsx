import React, { useEffect, useState } from 'react'
import { quotesCategories } from '../../data/categories_data'
import { HeadLine } from '../../components/component'
import Meta from '../../components/Meta'
import Collection_category_filter from '../../components/collectrions/collection_category_filter'
import CategoryDropDown from '../../components/dropdown/CategoryDropdown'
import { ProfessionsService } from '../../services/professions.service'
import { useQuotes } from '../../hooks/useQuotes'
import QuotesList from '../../components/collectrions/QuotesList'
import Pagination from '../../components/pagination/Pagination'
import Loader from '../../components/preloader/Loader'
import TagsDropdown from '../../components/dropdown/TagsDropdown'
import { useTags } from '../../hooks/useTags'

const Explore_collection = () => {
  const { queryData, searchTerm, handleSearch, handlePage, page, changeParams, total, isLoading } =
    useQuotes()

  const { tags, isLoading: isLoadingTags } = useTags()

  const [professions, setProfessions] = useState([])

  useEffect(() => {
    const fetchProfessions = async () => {
      const { data: professions } = await ProfessionsService.getProfessions()

      setProfessions(professions.sort((a, b) => a.name.localeCompare(b.name)))
    }
    fetchProfessions()
  }, [])

  return (
    <>
      <Meta
        title='Celebrities & Billionaires Quotes'
        desc={
          'Find inspiration in our vast collection of nearly 1 million celebrity quotes on billionaireslist.com. From wise words to love tips, discover the best quotes today.'
        }
      />

      <section className='relative mt-24'>
        <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
          <img src='/images/gradient_light.jpg' alt='gradient' className='h-full' />
        </picture>

        <div className='container'>
          <HeadLine
            text='Quotes by Celebrities'
            classes='font-display mb-4 text-center py-16 text-6xl animate-gradient'
          />

          <div className='container flex flex-wrap mb-5 items-start md:items-center justify-between'>
            <aside className='basis-full lg:basis-4/12 mb-4 lg:mb-0'>
              <div className='relative block'>
                <input
                  type='search'
                  className='text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white'
                  placeholder='Search'
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className='absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    className='fill-jacarta-500 h-4 w-4 dark:fill-white'>
                    <path fill='none' d='M0 0h24v24H0z'></path>
                    <path d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z'></path>
                  </svg>
                </div>
              </div>
            </aside>
            <div className='flex flex-col lg:flex-row gap-3 lg:items-center'>
              <Collection_category_filter
                changeParams={changeParams}
                filters={[{ parentId: 1, titleText: 'Profession', properties: professions }]}
              />
              <CategoryDropDown changeParams={changeParams} categories={quotesCategories} />
              <TagsDropdown tags={tags} isLoading={isLoadingTags} />
            </div>
          </div>
          <section className='flex py-12 md:py-24'>
            {!isLoading ? (
              <div className='container'>
                <div className='grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4'>
                  <QuotesList quotes={queryData} />
                </div>
              </div>
            ) : (
              <div className='min-h-[50vh] max-h-[70vh] w-full flex justify-center items-center'>
                <Loader />
              </div>
            )}
          </section>
          <Pagination handlePage={handlePage} page={page} total={total} pageSize={8} />
        </div>
      </section>
    </>
  )
}

export default Explore_collection
