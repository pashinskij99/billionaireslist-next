import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { QuotesService } from '../services/quotes.service'
import { useDebounce } from './useDebounce'

export const useQuotes = () => {
  const { query } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(query.search || '')
  const [queryData, setQueryData] = useState([])
  const [page, setPage] = useState()
  const [total, setTotal] = useState(null)
  const [params, setParams] = useState({ sort: 'author_asc', nationality: undefined })
  const debouncedSearch = useDebounce(searchTerm, 500)

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const changeParams = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const handlePage = async (page) => {
    const { data } = await QuotesService.getQuotes({
      perPage: '12',
      page: page,
      search: debouncedSearch,
      sort: params.sort,
      ...(params.nationality && { nationality: params.nationality }),
      ...(query.tag && { tag: query.tag }),
    })
    setTotal(data.pagination.total)
    if (!data.pagination.next_page) {
      setPage(Math.ceil(data.pagination.total / 12))
    } else {
      setPage(+data.pagination.next_page - 1)
    }
    setQueryData(data.quotes)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const { data } = await QuotesService.getQuotes({
        perPage: '12',
        page: '1',
        search: debouncedSearch,
        sort: params.sort,
        ...(params.nationality && { nationality: params.nationality }),
        ...(query.tag && { tag: query.tag }),
      })
      setTotal(data.pagination.total)
      setPage(data.pagination.next_page - 1)
      setQueryData(data.quotes)
      setIsLoading(false)
    })()
  }, [debouncedSearch, params, query.tag])

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
