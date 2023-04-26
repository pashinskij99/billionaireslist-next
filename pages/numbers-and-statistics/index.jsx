import React, { useEffect, useState } from 'react'
import Meta from '../../components/Meta'
import HeadLine from '../../components/headLine'
import { DefaultService } from '../../services/default.service'
import { netWorthFormat, thousandToK, thousandToKQuotes } from '../../utils/formatNumber'
import { useNationalities } from '../../hooks/statistics/useNationalities'
import { useGenders } from '../../hooks/statistics/useGenders'
import { useCategory } from '../../hooks/statistics/useCategory'
import { useSubcategories } from '../../hooks/statistics/useSubcategories'
import { useProfession } from '../../hooks/statistics/useProfession'
import { useAges } from '../../hooks/statistics/useAges'
import Loader from '../../components/preloader/Loader'
import NumbersTable from '../../components/numbers-table/NumbersTable'

const NumbersAndStatistics = () => {
  const [general, setGeneral] = useState([])

  const nationalities = useNationalities()

  const genders = useGenders()

  const categories = useCategory()

  const subcategories = useSubcategories()

  const profession = useProfession()

  const ages = useAges()

  useEffect(() => {
    const fetchStatistics = async () => {
      const { data } = await DefaultService.getStatistics()
      setGeneral(data)
    }

    fetchStatistics()
  }, [])

  return (
    <>
      <Meta
        title='Numbers and Statistics about Net Worth'
        desc={
          'Discover fascinating celebrity net worth statistics on BillionairesList.com, including breakdowns by gender, country, profession, and more. Get the latest numbers now.'
        }
      />

      {nationalities.isLoading || !general.length
        ? (<div className='h-[100vh] w-full flex justify-center items-center'>
          <Loader />
        </div>)
        : (<ContentPage 
          general={general} 
          agesData={ages} 
          professionData={profession} 
          subcategoriesData={subcategories} 
          categoriesData={categories}
          gendersData={genders}
          nationalitiesData={nationalities}
        />)
      }

    </>
  )
}

const ContentPage = ({
  general, 
  agesData, 
  professionData, 
  subcategoriesData,
  categoriesData,
  gendersData,
  nationalitiesData
}) => {
  const {
    ages,
    page: agesPage,
    handlePage: handleAgesPage,
    searchTerm: agesSearch,
    handleSearch: agesHandleSearch,
    isLoadingNext: isLoadingNextAges,
  } = agesData

  const {
    profession,
    page: professionPage,
    handlePage: handleProfessionPage,
    searchTerm: professionsSearch,
    handleSearch: professionsHandleSearch,
    isLoadingNext: isLoadingNextProfessions,
  } = professionData

  const {
    subcategories,
    page: subcategoriesPage,
    handlePage: handleSubcategoriesPage,
    searchTerm: subcategoriesSearch,
    handleSearch: subcategoriesHandleSearch,
    isLoadingNext: isLoadingNextSubcategories,
  } = subcategoriesData

  const {
    categories,
    page: categoriesPage,
    handlePage: handleCategoriesPage,
    searchTerm: categoriesSearch,
    handleSearch: categoriesHandleSearch,
    isLoadingNext: isLoadingNextCategories,
  } = categoriesData

  const {
    genders,
    page: gendersPage,
    handlePage: handleGendersPage,
    searchTerm: gendersSearch,
    handleSearch: gendersHandleSearch,
    isLoadingNext: isLoadingNextGenders,
  } = gendersData

  const {
    nationalities,
    page: nationalitiesPage,
    handlePage: handleNationalitiesPage,
    searchTerm: nationalitiesSearch,
    handleSearch: nationalitiesHandleSearch,
    isLoading,
    isLoadingNext: isLoadingNextNationalities,
  } = nationalitiesData

  return (
    <>
      <section className='relative pt-24'>
        <div className='container'>
          <div className='mx-auto max-w-2xl pt-16 text-center'>
            <HeadLine text='Numbers' classes='font-display text-center text-6xl animate-gradient' />
          </div>
        </div>
      </section>

      <section className='pb-24'>
        <div className='container'>
          <div className='pt-10'>
            <h2 className='font-display text-jacarta-700 text-center text-3xl dark:text-white'>
              What are the numbers?
            </h2>
            <h2 className='font-display text-jacarta-500 mb-16 text-center text-2xl dark:text-white'>
              Find out more below!
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3'>
              <div className='mb-10 text-center'>
                <span className='font-display text-jacarta-700 block text-5xl dark:text-white'>
                  {console.log(general[0].quotes)}
                  {thousandToKQuotes(general[0]?.quotes)}
                </span>
                <span className='dark:text-jacarta-300 block'>Quotes</span>
              </div>
              <div className='mb-10 text-center'>
                <span className='font-display text-jacarta-700 block text-5xl dark:text-white'>
                  {thousandToK(general[0]?.celebrity_count)}
                </span>
                <span className='dark:text-jacarta-300 block'>Celebrities</span>
              </div>
              <div className='mb-10 text-center'>
                <span className='font-display text-jacarta-700 block text-5xl dark:text-white'>
                  {netWorthFormat(general[0]?.net_worth_total)}
                </span>
                <span className='dark:text-jacarta-300 block'>Combined Wealth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NumbersTable
        data={nationalities}
        columns={[
          { name: 'Nationality', dataField: 'nationality' },
          { name: 'Total', dataField: 'total' },
          { name: 'Average', dataField: 'avg' },
        ]}
        title='Total Net Worth per Country'
        subtitle='Country-Wise Celebrities Data'
        page={nationalitiesPage}
        handlePage={handleNationalitiesPage}
        searchTerm={nationalitiesSearch}
        handleSearch={nationalitiesHandleSearch}
        isLoadingNext={isLoadingNextNationalities}
      />

      <NumbersTable
        data={genders}
        columns={[
          { name: 'Gender', dataField: 'gender' },
          { name: 'Total', dataField: 'total' },
          { name: 'Average', dataField: 'avg' },
        ]}
        title='Total Net Worth per Gender'
        subtitle='Gender-Wise Celebrities Data'
        page={gendersPage}
        handlePage={handleGendersPage}
        searchTerm={gendersSearch}
        handleSearch={gendersHandleSearch}
        isLoadingNext={isLoadingNextGenders}
      />

      <NumbersTable
        columns={[
          { name: 'Category', dataField: 'name' },
          { name: 'Total', dataField: 'total' },
          { name: 'Average', dataField: 'avg' },
        ]}
        data={categories}
        page={categoriesPage}
        handlePage={handleCategoriesPage}
        title='Total Net Worth per Category'
        subtitle='Category-Wise Celebrities Data'
        searchTerm={categoriesSearch}
        handleSearch={categoriesHandleSearch}
        isLoadingNext={isLoadingNextCategories}
      />

      <NumbersTable
        columns={[
          { name: 'Category', dataField: 'name' },
          { name: 'Subcategories', dataField: 'main' },
          { name: 'Total', dataField: 'total' },
          { name: 'Average', dataField: 'avg' },
        ]}
        data={subcategories}
        page={subcategoriesPage}
        handlePage={handleSubcategoriesPage}
        title='Total Net Worth per Sub-Category'
        subtitle='Sub-Category-Wise Celebrities Data'
        searchTerm={subcategoriesSearch}
        handleSearch={subcategoriesHandleSearch}
        isLoadingNext={isLoadingNextSubcategories}
      />

      <NumbersTable
        columns={[
          { name: 'Profession', dataField: 'name' },
          { name: 'Total', dataField: 'total' },
          { name: 'Average', dataField: 'avg' },
        ]}
        data={profession}
        page={professionPage}
        handlePage={handleProfessionPage}
        title='Total Net Worth per Profession'
        subtitle='Profession-Wise Celebrities Data'
        searchTerm={professionsSearch}
        handleSearch={professionsHandleSearch}
        isLoadingNext={isLoadingNextProfessions}
      />

      <NumbersTable
        columns={[
          { name: 'Ages', dataField: 'age' },
          { name: 'Total', dataField: 'total' },
          { name: 'Average', dataField: 'avg' },
        ]}
        data={ages}
        page={agesPage}
        handlePage={handleAgesPage}
        title='Total Net-worth per Age Class'
        subtitle='Age-wise Celebrities Data'
        searchTerm={agesSearch}
        handleSearch={agesHandleSearch}
        isLoadingNext={isLoadingNextAges}
      />
    </>
  )
}

export default NumbersAndStatistics
