import React, { useContext, useEffect, useState } from 'react'
import HomeMain from '../components/home/home_main'
import UserContext from '../components/UserContext'
import { CelebritiesService } from '../services/celebrities.service'
import { QuotesService } from '../services/quotes.service'
import { SettingsService } from "../services/settings.service";

export default function Home() {
  const [celebrities, setCelebrities] = useState([])
  const [featuredCelebrities, setFeaturedCelebrities] = useState([])
  const [quotes, setQuotes] = useState([])
  const [metaData, setMetaData] = useState({})

  const { scrollRef } = useContext(UserContext)

  useEffect(() => {
    window.scrollTo(0, scrollRef.current.scrollPos)
    const handleScrollPos = () => {
      scrollRef.current.scrollPos = window.scrollY
    }
    window.addEventListener('scroll', handleScrollPos)
    return () => {
      window.removeEventListener('scroll', handleScrollPos)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: celebrities } = await CelebritiesService.getCelebrities({
        sort: 'newest',
        perPage: '6',
      })

      const { data: featuredCelebrities } = await CelebritiesService.getFeaturedCelebrities({
        perPage: '8',
        page: '1',
      })

      const { data: settings } = await SettingsService.getSettings()

      const { title, description } = settings.reduce((settingsData, settingsItem) => {
        return {...settingsData, ...settingsItem}
      })

      const { data: quotes } = await QuotesService.getQuotes({ perPage: '4' })

      setCelebrities(celebrities.celebrities)
      setFeaturedCelebrities(featuredCelebrities)
      setQuotes(quotes.quotes)
      setMetaData({ title, description })
    }

    fetchData()
  }, [])

  return (
    <>
      <HomeMain
        celebrities={celebrities}
        featuredCelebrities={featuredCelebrities}
        quotes={quotes}
        metaData={metaData}
      />
    </>
  )
}
