import { useEffect, useMemo, useState } from 'react'
import { DefaultService } from '../../services/default.service'
import { useDebounce } from '../useDebounce'

export const useSubcategories = () => {
  const [subcategories, setSubcategories] = useState([])
  const [page, setPage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await DefaultService.getSubCategoriesStatistics({
      perPage: '20',
      page: page,
      name: searchTerm,
    })
    setPage(data.pagination.next_page)
    setSubcategories((prev) => [...prev, ...data.subcategories])
    setIsLoadingNext(false)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await DefaultService.getSubCategoriesStatistics({
        perPage: '20',
        page: '1',
        name: searchTerm,
      })
      if (data.pagination) {
        setPage(data.pagination.next_page)
        setSubcategories(data.subcategories)
      } else {
        setSubcategories(data)
      }
    }
    getData()
  }, [debouncedSearch])

  return useMemo(
    () => ({
      subcategories,
      page,
      handlePage,
      searchTerm,
      handleSearch,
      isLoadingNext,
    }),
    [subcategories, searchTerm, isLoadingNext],
  )
}
