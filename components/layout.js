import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConfigs } from '../redux/configs/configs.actions'
import { selectCategories, selectIsLoading, selectNewestCelebrities, selectSettings } from '../redux/configs/configs.selector'
import Footer from './footer'
import Header01 from './header/Header01'

export default function Layout({ children }) {
  const dispatch = useDispatch()

  const categories = useSelector(selectCategories)
  const celebrities = useSelector(selectNewestCelebrities)
  const settings = useSelector(selectSettings)

  // console.log({celebrities, setti})

  useEffect(() => {
    dispatch(getConfigs())
  }, [dispatch])

  return (
    <>
      <Header01 categories={categories} />
      <main>{children}</main>
      <Footer celebrities={celebrities} settings={settings} />
    </>
  )
}
