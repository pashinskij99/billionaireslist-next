import { useState } from 'react'

const CommentForm = ({ isVisible, submitFormHandler }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submitForm = async (e) => {
    e.preventDefault()
    await submitFormHandler({ name, email, message })
    setEmail('')
    setMessage('')
    setName('')
  }

  return (
    <>
      {isVisible ? (
        <form onSubmit={submitForm} id='comment-form'>
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
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              rows='5'
              value={message}
              onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>

          <button
            type='submit'
            className='bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all'
            id='contact-form-submit'>
            Send
          </button>
        </form>
      ) : null}
    </>
  )
}

export default CommentForm
