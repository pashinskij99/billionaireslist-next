import Image from 'next/image'
import Link from 'next/link'
import { removeImgTag } from '../../utils/removeImgTag'

const BlogItem = ({ id, author, title, content, user, date }) => {
  return (
    <article>
      <div className='rounded-2xl text-left overflow-hidden transition-shadow hover:shadow-lg'>
        <figure className='group overflow-hidden '>
          <Link href={`/blog/${id}`}>
            <a className='w-[100%] h-[214px] block relative'>
              <Image
                src='/images/1C03BEBD-B48A-46B0-BC73-14A6B37560A2.png'
                alt={title}
                layout='fill'
                objectFit='cover'
              />
            </a>
          </Link>
        </figure>

        <div className='dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-[10%]'>
          <h2 className='font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white'>
            <Link href={`/blog/${id}`}>
              <a>{title}</a>
            </Link>
          </h2>
          <p className='dark:text-jacarta-200 mb-8 text-ellipsis line-clamp-3' dangerouslySetInnerHTML={{ __html: removeImgTag(content) }} />
          <div className='text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm'>
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogItem
