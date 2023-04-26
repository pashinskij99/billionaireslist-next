/** @format */

import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectFavicon } from '../redux/configs/configs.selector'
import { getFaviconUrl } from '../utils/getFaviconUrl'

const Meta = ({ title, keyword, desc }) => {
  const favicon = useSelector(selectFavicon)
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='icon' href={getFaviconUrl(favicon)}/>
        <meta name='title' content={title} />
        <meta name='description' content={desc} />
        <meta name='robots' content='noindex, follow' />
        <meta name='keyword' content={keyword} />
        <meta
          property='og:image'
          content='/images/pedro-marroquin-BaqvjgjuXaQ-unsplash-scaled.jpg'
        />
      </Head>
    </div>
  )
}

Meta.defaultProps = {
  title: 'Real Time Billionaires List',
  keyword: '',
  desc: "Billionaires list updated in real time. The world's richest celebrities and their best quotes: Elon Musk, Jeff Bezos, Roger Federer, rappers, NBA players...",
}

export default Meta
