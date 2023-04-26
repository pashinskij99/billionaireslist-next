import React from 'react'
import ArtsCarousel from '../carousel/artCarousel'
import Quotes from '../categories/Quotes'
import NewseLatter2 from '../dao/newseLatter2'
import HeroSearch from '../hero/hero_search'
import Meta from '../Meta'
import FeaturesProfiles from '../categories/FeaturesProfiles'

const HomeMain = ({ celebrities, featuredCelebrities, quotes, metaData }) => {
  return (
    <main>
      <Meta title={metaData?.title} desc={metaData?.description} />
      <HeroSearch />
      <div className='container relative'>
        <ArtsCarousel data={celebrities} />
      </div>
      <FeaturesProfiles
        featuredCelebrities={featuredCelebrities.celebrities}
        pagination={featuredCelebrities.pagination}
      />
      <Quotes quotes={quotes} />
      <NewseLatter2 bgWhite={false} />
    </main>
  )
}

export default HomeMain
