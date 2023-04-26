import { useState } from 'react'
import ReactTooltip from 'react-tooltip'

import Meta from '../../components/Meta'
import HeadLine from '../../components/headLine'
import Map from '../../components/map/Map'
import { useEffect } from 'react'
import Cta from '../../components/cta/cta'
import { MapsService } from '../../services/maps.service'
import { mainNetWorthFormat } from '../../utils/formatNumber'

const Maps = ({ mapInfo }) => {
  const [content, setContent] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <Meta title='Net Worth by Country' desc={'Explore the net worth of celebrities by country on BillionairesList.com. Find out who\'s the wealthiest and get insights into their success.'} />
      <section className='relative pt-24'>
        <div className='container'>
          <div className='mx-auto max-w-2xl pt-16 text-center'>
            <HeadLine
              text='Maps'
              classes='font-display mb-4 text-center text-6xl animate-gradient mb-5'
            />
            <h3 className=' text-lg font-display text-jacarta-700 text-center dark:text-white'>
              Celebrities and wealth per country!
            </h3>
          </div>
          <div className='stroke-light-base h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] dark:stroke-jacarta-700 map-chart'>
            <Map setTooltipContent={setContent} mapInfo={mapInfo} />
          </div>
          {isMounted && (
            <ReactTooltip className='tooltip'>
              {content && (
                <div className='flex flex-col  text-jacarta-700  dark:text-white p-3 opacity-100 text-base font-medium bg-white dark:bg-jacarta-700 border rounded-lg border-jacarta-700 dark:border-white'>
                  <span>{content.name}</span>
                  <span>Celebrities: {content.count}</span>
                  <span>Wealth: ${mainNetWorthFormat(content.total)}</span>
                </div>
              )}
            </ReactTooltip>
          )}
        </div>
        <Cta />
      </section>
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await MapsService.getGoogleMaps()

    return { props: { mapInfo: data } }
  } catch (error) {
    return { props: {} }
  }
}

export default Maps
