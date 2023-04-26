import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { CelebritiesService } from '../services/celebrities.service'
import { serializeCategory } from '../utils/serializeCategories'
import { useDebounce } from './useDebounce'

export const useCelebrities = () => {
  const { query } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(query.search || '')
  const [queryData, setQueryData] = useState([])
  const [page, setPage] = useState()
  const [total, setTotal] = useState(null)
  const [params, setParams] = useState({ sort: 'author_asc' })
  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const changeParams = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const handlePage = async (page) => {
    const { data } = await CelebritiesService.getCelebrities({
      perPage: '16',
      page: page,
      search: debouncedSearch,
      ...(query.category && { ...serializeCategory(query.category) }),
      ...params,
    })
    setTotal(data.pagination.total)

    if (!data.pagination.next_page) {
      setPage(Math.ceil(data.pagination.total / 8))
    } else {
      setPage(+data.pagination.next_page - 1)
    }

    setQueryData(data.celebrities)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const { data } = await CelebritiesService.getCelebrities({
        perPage: '16',
        page: '1',
        search: debouncedSearch,
        ...(query.category && { ...serializeCategory(query.category) }),
        ...params,
      })
      setTotal(data.pagination.total)
      setPage(data.pagination.next_page - 1)
      setQueryData(data.celebrities)
      setIsLoading(false)
    })()
  }, [debouncedSearch, params, query.category])

  useEffect(() => {
    setSearchTerm(query.search)
  }, [query.search])

  return useMemo(
    () => ({
      handleSearch,
      searchTerm,
      queryData,
      changeParams,
      page,
      handlePage,
      total,
      isLoading,
    }),
    [queryData, searchTerm, isLoading],
  )
}
