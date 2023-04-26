import Link from 'next/link'
import BlogItem from './BlogItem'

const BlogList = ({
  data,
  classes = 'grid grid-cols-1 gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3',
}) => {
  return (
    <>
      <div className={classes}>
        {data.map((item) => {
          const { id, author, title, content, created } = item
          return (
            <BlogItem
              key={id}
              id={id}
              title={title}
              author={author.user_nicename}
              content={content}
              date={created}
            />
          )
        })}
      </div>
    </>
  )
}

export default BlogList
