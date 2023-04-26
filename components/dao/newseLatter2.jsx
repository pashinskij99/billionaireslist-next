import HeadLine from '../headLine'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { useState } from 'react'
import { SubscriptionsService } from '../../services/subscriptions.service'
import { toast } from 'react-hot-toast'

const NewseLatter2 = () => {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsSubscribing(true)
      await SubscriptionsService.postSubscription({ email })
      toast.success('Thanks')
      setIsSubscribing(false)
    } catch (err) {
      setIsSubscribing(false)
    }
    setEmail('')
  }

  return (
    <section className='relative py-12 md:py-24'>
      <picture className='pointer-events-none absolute inset-0 -z-10 dark:hidden'>
        <Image
          src='/images/gradient.jpg'
          alt='gradient'
          className='h-full w-full'
          layout='fill'
          unoptimized
        />
      </picture>
      <picture className='pointer-events-none absolute inset-0 -z-10 hidden dark:block'>
        <Image
          src='/images/gradient_dark.jpg'
          alt='gradient dark'
          className='h-full w-full'
          unoptimized
          layout='fill'
        />
      </picture>

      <div className='container'>
        <div className='rounded-2.5xl bg-white px-6 py-10 md:px-12 md:py-20 text-center dark:bg-jacarta-700'>
          <HeadLine
            text='Subscribe Now To Receive The Latest Updates And News'
            classes='mb-5 font-display text-3xl text-jacarta-700 dark:text-white'
          />
          <div className='mx-auto mt-7 max-w-md text-center'>
            <form className='relative' onSubmit={handleSubmit}>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Email address'
                  className='dark:bg-jacarta-700 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 w-full rounded-full border py-3 px-4 dark:text-white dark:placeholder-white'
                />
                <button
                  onSubmit={handleSubmit}
                  disabled={isSubscribing}
                  className={cn(
                    'hover:bg-accent-dark font-display bg-accent absolute top-[50%] translate-y-[-50%] right-2 rounded-full px-3 md:px-6 py-1 md:py-2 text-2xs md:text-sm text-white',
                    {
                      ['brightness-75']: isSubscribing,
                    },
                  )}>
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              <div className='mt-3 mr-2 ml-1 flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='contact-form-consent-input'
                  name='agree-to-terms'
                  required
                  className='checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0 cursor-pointer'
                />
                <label
                  htmlFor='contact-form-consent-input'
                  className='dark:text-jacarta-200 text-sm'>
                  I agree to the
                  <Link href='/terms-of-use'>
                    <a target='_blank' className='text-accent'>
                      Terms of Service
                    </a>
                  </Link>
                </label>
              </div>

              <div
                id='contact-form-notice'
                className='relative mt-4 hidden rounded-lg border border-jacarta-200 p-4'>
                Thanks!
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewseLatter2
