import { useEffect, useMemo, useState } from 'react'
import { CelebritiesService } from '../services/celebrities.service'

export const useRankings = () => {
  const [rankings, setRankings] = useState([])
  const [page, setPage] = useState()
  const [sort, setSort] = useState('contemporary')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const handlePage = async (page) => {
    setIsLoadingNext(true)
    const { data } = await CelebritiesService.getRankingCelebrities({
      perPage: '20',
      page: page,
      sort: sort,
    })
    setPage(data.pagination.next_page)
    setRankings((prev) => [...prev, ...data.celebrities])
    setIsLoadingNext(false)
  }

  const handleSort = async (sortType) => {
    const { data } = await CelebritiesService.getRankingCelebrities({
      perPage: '20',
      page: 1,
      sort: sortType,
    })
    setSort(sortType)
  
    setPage(data.pagination.next_page)
    setRankings(data.celebrities)
  }

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const { data } = await CelebritiesService.getRankingCelebrities({
        perPage: '20',
        page: '1',
        sort: sort,
      })
      
      if (data.pagination) {
        setPage(data.pagination.next_page)
        setRankings(data.celebrities)
      } else {
        setRankings(data)
      }
      setIsLoading(false)
    }
    getData()
  }, [])

  return useMemo(
    () => ({
      rankings,
      page,
      handlePage,
      handleSort,
      isLoading,
      isLoadingNext,
    }),
    [rankings, isLoading, isLoadingNext],
  )
}
