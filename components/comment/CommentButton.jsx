import cn from 'classnames'

const CommentButton = ({ title, isVisibleCommentForm, setIsVisibleCommentForm }) => {
  return (
    <button
      onClick={setIsVisibleCommentForm}
      className='mt-8 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-accent hover:bg-accent border-jacarta-100 font-display text-jacarta-700 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white'>
      <span className='-mb-1 mr-1'>{title}</span>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        className={cn('fill-jacarta-500 h-4 w-4 dark:fill-white', {
          ['rotate-180']: isVisibleCommentForm,
        })}>
        <path fill='none' d='M0 0h24v24H0z'></path>
        <path d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'></path>
      </svg>
    </button>
  )
}

export default CommentButton
