const Comment = ({ id, username, email, text, date, url }) => {
  return (
    <div>
      <div className='rounded-2xl bg-light-base dark:bg-jacarta-800 p-5 shadow-base mt-8'>
        <div className='flex items-center flex-wrap mb-6 text-sm pt-5 py-5 border-b dark:border-jacarta-300 border-b-jacarta-200 gap-3 font-medium text-jacarta-700 dark:text-white'>
          <a href={url ? url : ''} target='_blank' className='text-accent cursor-pointer'>
            {username}
          </a>
          {email && (
            <>
              <span className='text-accent font-bold'>•</span>
              <span>{email}</span>
            </>
          )}
          <span className='text-accent font-bold'>•</span>
          <span>{date}</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Comment
