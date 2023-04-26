import { useEffect, useMemo, useState } from 'react'
import { CelebritiesService } from '../services/celebrities.service'
import { TagsService } from '../services/tags.service'

export const useTags = () => {
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const { data } = await TagsService.getTags()
      setTags(data)
      setIsLoading(false)
    }
    getData()
  }, [])

  return useMemo(
    () => ({
      tags,
      isLoading,
    }),
    [tags, isLoading],
  )
}
