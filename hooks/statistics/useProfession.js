import { useEffect, useMemo, useState } from 'react'
import { DefaultService } from '../../services/default.service'
import { useDebounce } from '../useDebounce'

export const useProfession = () => {
  const [profession, setProfession] = useState([])
  const [page, setPage] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await DefaultService.getProfessionsStatistics({
      perPage: '20',
      page: page,
      name: searchTerm,
    })
    setPage(data.pagination.next_page)
    setProfession((prev) => [...prev, ...data.professions])
    setIsLoadingNext(false)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await DefaultService.getProfessionsStatistics({
        perPage: '20',
        page: '1',
        name: searchTerm,
      })
      if (data.pagination) {
        setPage(data.pagination.next_page)
        setProfession(data.professions)
      } else {
        setProfession(data)
      }
    }
    getData()
  }, [debouncedSearch])

  return useMemo(
    () => ({
      profession,
      page,
      handlePage,
      searchTerm,
      handleSearch,
      isLoadingNext,
    }),
    [profession, searchTerm, isLoadingNext],
  )
}
