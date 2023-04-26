import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Comment from "../../components/comment/Comment";
import CommentButton from "../../components/comment/CommentButton";
import CommentForm from "../../components/comment/CommentForm";
import Meta from "../../components/Meta";
import Loader from "../../components/preloader/Loader";
import { CommentsService } from "../../services/comments.cervice";
import { DefaultService } from "../../services/default.service";
import { removeImgTag } from "../../utils/removeImgTag";

export async function getServerSideProps(ctx) {
  const id = ctx.query.id;

  const { data } = await DefaultService.getPostById(id);

  return {
    props: {
      id,
      blog: data,
    },
  };
}

const BlogPage = ({ id, blog }) => {
  const [related, setRelated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleCommentForm, setIsVisibleCommentForm] = useState(true);

  const postComment = async ({ email, name, message }) => {
    try {
      await CommentsService.postComment(id, {
        comment_author: name,
        comment_author_email: email,
        comment_content: message,
      });
      toast.success(
        "The comment will appear after confirmation by the administrator"
      );
    } catch (err) {}
  };

  useEffect(() => {
    const getBlog = async () => {
      const { data: comments } = await CommentsService.getCommentsById(id);
      const {
        data: { posts },
      } = await DefaultService.getPosts({
        perPage: "4",
        page: "1",
      });

      setComments(comments);
      setRelated([...posts.slice(0, 2)]);
      setPopular([...posts.slice(0, 4)]);
      setIsLoading(false);
    };
    getBlog();
  }, [id]);

  return (
    <>
      <Meta title={blog.seo_title} desc={blog.seo_description} />
      {isLoading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <ContentPage
          blog={blog}
          related={related}
          popular={popular}
          comments={comments}
          isVisibleCommentForm={isVisibleCommentForm}
          setIsVisibleCommentForm={setIsVisibleCommentForm}
          postComment={postComment}
        />
      )}
    </>
  );
};

const ContentPage = ({
  blog,
  related,
  popular,
  comments,
  isVisibleCommentForm,
  setIsVisibleCommentForm,
  postComment,
}) => {
  return (
    <div>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <img
          className="h-full w-full"
          src="/images/gradient.jpg"
          alt="gradient"
        />
      </picture>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
        <img
          className="h-full w-full"
          src="/images/gradient_dark.jpg"
          alt="gradient dark"
        />
      </picture>
      <section className="relative  pt-[5.5rem] lg:pt-24">
        <div className="py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col w-full lg:w-2/3">
                <div className="px-11 pb-10 border dark:border-jacarta-300 border-jacarta-200 rounded-2xl w-full">
                  <div className="flex items-center flex-wrap mb-6 text-sm pt-5 py-5 border-b dark:border-jacarta-300 border-b-jacarta-200 gap-3 font-medium text-jacarta-700 dark:text-white">
                    <div className="flex items-center group gap-3 dark:hover:text-accent-light hover:text-accent-light">
                      <Image
                        src={blog.author.avatar}
                        alt="admin image"
                        className="rounded-full"
                        width={50}
                        height={50}
                        unoptimized
                      />
                      <Link href="#">
                        <a className="duration-75">
                          {blog.author.user_nicename}
                        </a>
                      </Link>
                    </div>
                    <span className="text-accent font-bold">•</span>
                    <span>{blog.created}</span>
                    <span className="text-accent font-bold">•</span>
                    <span>
                      {blog?.comments_count
                        ? `${blog.comments_count} Comments`
                        : "No Comments"}
                    </span>
                  </div>

                  <h1 className="my-9 text-5xl font-bold text-jacarta-700 dark:text-white">
                    {blog.title}
                  </h1>

                  <p
                    className="text-base mt-14 mb-10 child:!text-jacarta-700 child:dark:!text-white"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                <div className="w-full mt-14">
                  <h4 className="font-bold text-lg mb-5 duration-100 group-hover:text-accent-lighter cursor-pointer">
                    Comments ({comments.length})
                  </h4>
                  {comments.map(
                    ({
                      id,
                      comment_author,
                      comment_author_email,
                      comment_content,
                      comment_date,
                      comment_author_url,
                    }) => (
                      <div key={id}>
                        <Comment
                          id={id}
                          username={comment_author}
                          date={comment_date}
                          email={comment_author_email}
                          text={comment_content}
                          url={comment_author_url}
                        />
                      </div>
                    )
                  )}

                  <CommentButton
                    title="Comment"
                    isVisibleCommentForm={isVisibleCommentForm}
                    setIsVisibleCommentForm={() =>
                      setIsVisibleCommentForm((prev) => !prev)
                    }
                  />
                  <div className="mt-8">
                    <CommentForm
                      submitFormHandler={postComment}
                      isVisible={isVisibleCommentForm}
                    />
                  </div>
                </div>

                <div className="w-full mt-14">
                  <h2 className="font-bold text-4xl animate-gradient">
                    Related Posts
                  </h2>

                  <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5">
                    {related.length &&
                      related.map(({ id, title, content, author }) => (
                        <div
                          key={id}
                          className="flex flex-col border rounded-2xl dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 transition-shadow hover:shadow-lg"
                        >
                          <Link href={`/blog/${id}`}>
                            <a className="h-64">
                              <img
                                className="w-full h-full object-cover rounded-t-2xl"
                                src="/images/Quotes-1024x1024.png"
                              />
                            </a>
                          </Link>
                          <div className="flex flex-col py-11 px-9">
                            <h3 className="text-xl font-bold text-jacarta-700 dark:text-white duration-100 dark:hover:text-accent-light hover:text-accent-light cursor-pointer">
                              {title}
                            </h3>
                            <div className="flex items-center flex-wrap mb-6 text-sm pt-5 py-5 border-b dark:border-jacarta-300 border-b-jacarta-200 gap-3 font-medium text-jacarta-700 dark:text-white">
                              <Link href="#">
                                <a className="duration-100 dark:hover:text-accent-light hover:text-accent-light">
                                  {author.user_nicename}
                                </a>
                              </Link>
                            </div>
                            <p
                              className="text-base child:text-jacarta-700 child:dark:text-white line-clamp-3"
                              dangerouslySetInnerHTML={{
                                __html: removeImgTag(content),
                              }}
                            ></p>
                            <Link href={`/posts/${id}`}>
                              <div className="flex group pl-3 items-center overflow-hidden justify-between mt-9 border rounded-md dark:border-jacarta-200 border-jacarta-100 text-jacarta-700 dark:text-white text-sm font-medium h-11 w-32 duration-100 cursor-pointer dark:hover:border-accent-light dark:hover:text-accent-light hover:border-accent hover:text-accent">
                                Read More
                                <div className="h-full w-9 flex items-center justify-center border duration-100 bg-jacarta-200 border-jacarta-200 dark:group-hover:bg-accent group-hover:bg-accent dark:group-hover:border-accent group-hover:border-accent">
                                  <svg className="icon fill-white h-5 w-5 dark:group-hover:fill-white -rotate-90">
                                    <use
                                      xlinkHref={`/icons.svg#icon-down-arrow`}
                                    ></use>
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 flex flex-col gap-12">
                <div className="py-8 px-11 border rounded-2xl dark:border-jacarta-300 border-jacarta-200 child:!text-jacarta-700 child:dark:!text-white bg-light-base dark:bg-transparent">
                  <h3 className="text-xl font-bold mb-7 animate-gradient text-center">
                    Popular posts
                  </h3>

                  {popular.length &&
                    popular.map(({ id, title, content }) => (
                      <div
                        key={id}
                        className="py-5 px-5 group mb-5 border rounded-2xl dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 transition-shadow hover:shadow-lg"
                      >
                        <Link href={`/blog/${id}`}>
                          <a className="flex">
                            <div className="min-w-[70px] h-[70px] relative">
                              <Image
                                src="/images/Quotes-150x150.png"
                                className="rounded-full cursor-pointer"
                                alt="quote"
                                layout="fill"
                                unoptimized
                              />
                            </div>
                            <div className="ml-4 w-[167px]">
                              <h4 className="font-bold text-base mb-5 duration-100 group-hover:text-accent-lighter cursor-pointer">
                                {title}
                              </h4>

                              <p
                                className="text-xs text-ellipsis overflow-hidden text-ellipsis-2"
                                dangerouslySetInnerHTML={{ __html: content }}
                              ></p>
                            </div>
                          </a>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
