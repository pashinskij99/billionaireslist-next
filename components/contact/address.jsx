import { useSelector } from 'react-redux'
import { socialIcons } from '../../data/contact_us_data'
import { selectSettings } from '../../redux/configs/configs.selector'
import { getSocialIconsList } from '../../utils/getSocialIconsList'

const Address = () => {
  const { facebook_link, twitter_link, tiktok_link, instagram_link } = useSelector(selectSettings)

  return (
    <div className='lg:w-1/3 lg:pl-5'>
      <h2 className='font-display text-jacarta-700 mb-4 text-xl dark:text-white'>Get in Touch! </h2>
      <p className='dark:text-jacarta-300 mb-6 text-lg leading-normal'>
        {'Let’s connect and make something great out of it!   '}
      </p>

      <div className='dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2.5xl border bg-white p-10'>
        <div className='flex justify-between'>
          {getSocialIconsList([facebook_link, twitter_link, instagram_link, tiktok_link]).map(
            (item) => (
              <a
                key={item.id}
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 bg-light-base flex h-11 w-11 shrink-0 items-center justify-center rounded-full border'>
                <svg className='icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white'>
                  <use xlinkHref={`/icons.svg#icon-${item.text}`}></use>
                </svg>
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default Address
