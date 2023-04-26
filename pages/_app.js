import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import UserContext from '../components/UserContext'
import { useRef } from 'react'
import Toast from '../components/toast/Toast'
import Preloader from '../components/preloader/Preloader'
import { store } from '../redux/store'

function MyApp({ Component, pageProps }) {
  const scrollRef = useRef({
    scrollPos: 0,
  })

  return (
    <>
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute='class'>
          {/* <Toast /> */}
          <Preloader />
          <UserContext.Provider value={{ scrollRef: scrollRef }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContext.Provider>
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default MyApp 
