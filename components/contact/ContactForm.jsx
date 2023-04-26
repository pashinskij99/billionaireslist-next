import Link from 'next/link'
import { useState } from 'react'
import cn from 'classnames'
import { toast } from 'react-hot-toast'
import { ContactsService } from '../../services/contacts.service'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      setIsSending(true)
      await ContactsService.subscribe({ email, name, text: message })
      toast.success('Successfully sended')
      setIsSending(false)
    } catch (err) {
      setIsSending(false)
    }
    setEmail('')
    setMessage('')
    setName('')
  }

  return (
    <form onSubmit={submitForm} id='contact-form'>
      <div className='flex space-x-7'>
        <div className='mb-6 w-1/2'>
          <label className='font-display text-jacarta-700 mb-1 block text-sm dark:text-white'>
            Name<span className='text-red'>*</span>
          </label>
          <input
            name='name'
            className='contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white'
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='mb-6 w-1/2'>
          <label className='font-display text-jacarta-700 mb-1 block text-sm dark:text-white'>
            Email<span className='text-red'>*</span>
          </label>
          <input
            name='email'
            className='contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white'
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className='mb-4'>
        <label className='font-display text-jacarta-700 mb-1 block text-sm dark:text-white'>
          Message<span className='text-red'>*</span>
        </label>
        <textarea
          id='message'
          className='contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white'
          required
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows='5'></textarea>
      </div>

      <div className='mb-6 flex items-center space-x-2'>
        <input
          required
          type='checkbox'
          id='contact-form-consent-input'
          name='agree-to-terms'
          className='checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0 cursor-pointer'
        />
        <label htmlFor='contact-form-consent-input' className='dark:text-jacarta-200 text-sm'>
          I agree to the{' '}
          <Link href='/terms-of-use'>
            <a target='_blank' className='text-accent'>
              Terms of Service
            </a>
          </Link>
        </label>
      </div>

      <button
        type='submit'
        className={cn(
          'bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all',
          {
            ['brightness-75']: isSending,
          },
        )}
        id='contact-form-submit'>
        {isSending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default ContactForm
