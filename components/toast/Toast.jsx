import Image from 'next/image'
import { Toaster, resolveValue } from 'react-hot-toast'
import cn from 'classnames'

const Toast = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
      }}>
      {(t) => {
        return (
          <div
            className={cn(
              'p-4 border-2 rounded-lg shadow-2xl bg-light-base dark:bg-jacarta-700 border-accent-dark',
              {},
            )}>
            <p
              className={cn(' text-lg font-semibold', {
                ['text-red']: t.type === 'error',
                ['text-green']: t.type === 'success',
              })}>
              {t.type === 'error' ? 'Error' : 'Success'}
            </p>
            <p className='text-jacarta-900 dark:text-light-base font-semibold'>
              {resolveValue(t.message, t)}
            </p>
          </div>
        )
      }}
    </Toaster>
  )
}

export default Toast
