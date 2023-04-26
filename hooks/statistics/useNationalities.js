import { useEffect, useMemo, useState } from 'react'
import { DefaultService } from '../../services/default.service'
import { useDebounce } from '../useDebounce'

export const useNationalities = () => {
  const [nationalities, setNationalities] = useState([])
  const [page, setPage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await DefaultService.getNationalitiesStatistics({
      perPage: '20',
      page: page,
      name: searchTerm,
    })
    setPage(data.pagination.next_page)
    setNationalities((prev) => [...prev, ...data.nationalities])
    setIsLoadingNext(false)
  }

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const { data } = await DefaultService.getNationalitiesStatistics({
        perPage: '20',
        page: '1',
        name: searchTerm,
      })
      setPage(data.pagination.next_page)
      setNationalities(data.nationalities)
      setIsLoading(false)
    }
    getData()
  }, [debouncedSearch])

  return useMemo(
    () => ({
      nationalities,
      page,
      handlePage,
      handleSearch,
      searchTerm,
      isLoading,
      isLoadingNext,
    }),
    [nationalities, searchTerm, isLoading, isLoadingNext],
  )
}
