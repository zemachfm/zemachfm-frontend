import React from 'react';
import Link from 'next/link';
import { IPost } from '../../types/blog.d';
import Thumbnail from './thumbnail';

type props = {
  posts: IPost[];
  strings: {
    title: string;
    subtitle: string;
  };
};

const BlogsTeaser: React.FC<props> = ({ posts, strings }) => {
  const { title, subtitle } = strings;
  return (
    <div className=" mx-auto" id="blogTeaser">
      <div className="2xl:max-w-screen-xl max-w-sm xl:max-w-screen-lg lg:max-w-screen-md mx-auto pt-6 pb-10">
        <div className="text-left mb-6 mt-6  ">
          <h1 className=" text-3xl lg:text-4xl 2xl:text-5xl  my-10 font-bold dark:text-gray-200 mb-2 ">
            {title}
          </h1>
          <p className="text-gray-400 text-lg mb-7">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {posts.map(post => (
            <div
              className={`rounded-xl bg-white dark:bg-black  py-4 px-4 border dark:border-gray-900 border-gray-200 overflow-hidden `}
              key={post.slug}
            >
              <Thumbnail
                slug={post.slug}
                src={post.thumbnail}
                title={post.title}
              />
              <div className="content">
                <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                  <Link href={`/posts/${post.slug}`}>
                    <a>{post.title} &rarr;</a>
                  </Link>
                </h2>
                <p className="dark:text-gray-300 text-gray-500 mb-4 text-md">
                  {' '}
                  {post.date}{' '}
                </p>
                <div className="text-gray-600 dark:text-gray-400 mb-3">
                  {post.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BlogsTeaser;
