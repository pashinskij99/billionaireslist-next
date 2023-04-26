import { useEffect, useMemo, useState } from 'react'
import { DefaultService } from '../../services/default.service'
import { useDebounce } from '../useDebounce'

export const useGenders = () => {
  const [genders, setGenders] = useState([])
  const [page, setPage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await DefaultService.getGenderStatistics({
      perPage: '20',
      page: page,
      name: searchTerm,
    })
    setPage(data.pagination.next_page)
    setGenders((prev) => [...prev, ...data.genders])
    setIsLoadingNext(false)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await DefaultService.getGenderStatistics({
        perPage: '20',
        page: '1',
        name: searchTerm,
      })
      if (data.pagination) {
        setPage(data.pagination.next_page)
        setGenders(data.genders)
      } else {
        setGenders(data)
      }
    }
    getData()
  }, [debouncedSearch])

  return useMemo(
    () => ({
      genders,
      page,
      handlePage,
      searchTerm,
      handleSearch,
      isLoadingNext,
    }),
    [genders, searchTerm, isLoadingNext],
  )
}
