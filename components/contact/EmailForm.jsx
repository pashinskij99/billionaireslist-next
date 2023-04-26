/** @format */

import Link from 'next/link'

const EmailForm = () => {
    return (
        <div className='container'>
            <div className='flex space-x-7'>
                <h2 className='w-1/2 mb-10 font-display text-2xl text-jacarta-700 dark:text-white lg:text-3xl xl:text-4xl'>
                    Subscribe Now To Receive The Latest Updates And News
                </h2>
                <form id='contact-form' className='w-1/2' method='post'>
                    <div className='mb-4'>
                        <input
                            name='email'
                            className='contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white'
                            id='email'
                            type='email'
                            placeholder='Email'
                            required
                        />
                    </div>

                    <div className='mb-6 flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            id='contact-form-consent-input'
                            name='agree-to-terms'
                            className='checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0 cursor-pointer'
                        />
                        <label className='dark:text-jacarta-200 text-sm'>
                            I agree to the{' '}
                            <Link href='/terms'>
                                <a className='text-accent'>Terms of Service</a>
                            </Link>
                        </label>
                    </div>

                    <button
                        type='submit'
                        className='bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all'
                        id='contact-form-submit'
                    >
                        Submit
                    </button>

                    <div id='contact-form-notice' className='relative mt-4 hidden rounded-lg border border-transparent p-4'></div>
                </form>
            </div>
        </div>
    )
}

export default EmailForm
