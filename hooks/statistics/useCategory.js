import { useEffect, useMemo, useState } from 'react'
import { DefaultService } from '../../services/default.service'
import { useDebounce } from '../useDebounce'

export const useCategory = () => {
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await DefaultService.getCategoriesStatistics({
      perPage: '20',
      page: page,
      name: searchTerm,
    })
    setPage(data.pagination.next_page)
    setCategories((prev) => [...prev, ...data.categories])
    setIsLoadingNext(false)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await DefaultService.getCategoriesStatistics({
        perPage: '20',
        page: '1',
        name: searchTerm,
      })
      if (data.pagination) {
        setPage(data.pagination.next_page)
        setCategories(data.categories)
      } else {
        setCategories(data)
      }
    }
    getData()
  }, [debouncedSearch])

  return useMemo(
    () => ({
      categories,
      page,
      handlePage,
      searchTerm,
      handleSearch,
      isLoadingNext,
    }),
    [categories, searchTerm, isLoadingNext],
  )
}
