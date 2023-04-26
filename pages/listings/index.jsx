import React, { useContext } from 'react'
import { HeadLine } from '../../components/component'
import CelebritiesList from '../../components/collectrions/CelebritiesList'
import Meta from '../../components/Meta'
import CategoryDropDown from '../../components/dropdown/CategoryDropdown'
import { useCelebrities } from '../../hooks/useCelebrities'
import { listingsCategories } from '../../data/categories_data'
import { CategoriesService } from '../../services/categories.service'
import CelebritiesCategoryFilter from '../../components/filters/CelebritiesCategoryFilter'
import Pagination from '../../components/pagination/Pagination'
import Loader from '../../components/preloader/Loader'
import { ListingCelebritiesContext, ListingCelebritiesContextProvider } from '../../context/listingCelebritiesContext'

export async function getServerSideProps(context) {
  const { data } = await CategoriesService.getCategories()

  const currentCategoryId = +context.resolvedUrl.replace(/^\D+/g, '')
  
  let currentCategory = { name: '' }
  category: for (const category of data) {
    if (currentCategoryId === category.id) {
      currentCategory = {type: 'category', category}
      break category
    }
    sub_category: for (const subCategory of category.subcategories) {
      if (currentCategoryId === subCategory.id) {
        currentCategory = {type: 'sub_category', category: subCategory} 
        break sub_category
      }
    }
  }

  const seo_info = {
    default: {
      title: 'Celebrities & Billionaires Listing by Wealth',
      description: 'Search for your favorite celebrities and learn everything about their career and personal life. Crypto rich, billionaires, CEO, politicians. We have them all.'
    },
    category: {
      title: `List of the Most Famous ${currentCategory.category?.name.slice(-1) === 's' ? currentCategory.category?.name : currentCategory.category?.name + 's'
        }`,
      description: `Explore the tales of the world's wealthiest ${currentCategory.category?.name} on BillionairesList.com. Uncover expert knowledge about the fittest and most renowned sports stars on Earth.`
    },
    subCategory: {
      title: `Success Stories about the Greatest ${currentCategory.category?.name.slice(-1) === 's' ? currentCategory.category?.name : currentCategory.category?.name + 's'
        }`,
      description: `Discover the captivating stories of the world's top ${currentCategory.category?.name} on BillionairesList.com. Gain exclusive knowledge about their secrets to success today..`
    },
  }

  const getSeoInfo = (currentCategory) => {
    switch (currentCategory.type) {
      case 'category':
        return seo_info.category
        break;
      case 'sub_category':
        return seo_info.subCategory
        break
      default:
        return seo_info.default
        break;
    }
  }

  return {
    props: {
      seo_info: getSeoInfo(currentCategory)
    },
  }
}

const Listings = ({ seo_info }) => {
  const { queryData, searchTerm, handleSearch, handlePage, page, changeParams, total, isLoading } =
    useCelebrities()

  return (
    <>
      <Meta
        title={seo_info.title}
        desc={seo_info.description}
      />
      <section className='relative mt-24'>
        <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
          <img src='/images/gradient_light.jpg' alt='gradient' className='h-full' />
        </picture>

        <div className='container'>
          <HeadLine
            text="I'm looking for..."
            classes='font-display mb-4 text-center py-16 text-6xl animate-gradient'
          />

          <div className='container flex flex-wrap items-start justify-between'>
            <aside className='basis-full md:basis-4/12 mb-4 md:mb-0'>
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

            <ul className='flex flex-col md:flex-row gap-3 flex-wrap items-start md:items-center'>

              <ListingCelebritiesContextProvider>

                <ButtonSeeAll />

                <CelebritiesCategoryFilter />

              </ListingCelebritiesContextProvider>

              <CategoryDropDown changeParams={changeParams} categories={listingsCategories} />
              {/* <Collection_dropdown changeParams={changeParams}/> */}
            </ul>
          </div>

          <section className='pt-24 pb-12'>
            <div className='container'>
              {!isLoading ? (
                <div className='grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4'>
                  <CelebritiesList data={queryData} />
                </div>
              ) : (
                <div className='min-h-[50vh] max-h-[70vh] w-full flex justify-center items-center'>
                  <Loader />
                </div>
              )}
            </div>
          </section>

          <Pagination handlePage={handlePage} page={page} total={total} pageSize={16} />
        </div>
      </section>
    </>
  )
}

const ButtonSeeAll = () => {
  const { onClearFilter } = useContext(ListingCelebritiesContext)

  return (
    <button
      className='group dropdown-toggle dark:border-jacarta-600 dark:bg-jacarta-700 group dark:hover:bg-accent hover:bg-accent border-jacarta-100 font-display text-jacarta-700 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white'
      onClick={() => onClearFilter()}>
      <span className='-mb-1'>See All</span>
    </button>
  )
}

export default Listings
