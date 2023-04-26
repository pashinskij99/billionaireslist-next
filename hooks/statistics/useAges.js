import { useEffect, useMemo, useState } from 'react'
import { DefaultService } from '../../services/default.service'
import { useDebounce } from '../useDebounce'

export const useAges = () => {
  const [ages, setAges] = useState([])
  const [page, setPage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await DefaultService.getAgesStatistics({
      perPage: '20',
      page: page,
      name: searchTerm,
    })
    setPage(data.pagination.next_page)
    setAges((prev) => [...prev, ...data.ages])
    setIsLoadingNext(false)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await DefaultService.getAgesStatistics({
        perPage: '20',
        page: '1',
        name: searchTerm,
      })
      if (data.pagination) {
        setPage(data.pagination.next_page)
        setAges(data.ages)
      } else {
        setAges(data)
      }
    }
    getData()
  }, [debouncedSearch])

  return useMemo(
    () => ({
      ages,
      page,
      handlePage,
      searchTerm,
      handleSearch,
      isLoadingNext,
    }),
    [ages, searchTerm, isLoadingNext],
  )
}
