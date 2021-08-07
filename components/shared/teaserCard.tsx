import React from 'react';
import Link from 'next/link';
import { IPost } from '../../types/blog.d';
import Thumbnail from './thumbnail';
import { IOurWorks } from '../../store/home/types.d';

type props = {
  works?: IOurWorks;
  posts?: IPost[];
  strings?: {
    title: string;
    subtitle: string;
  };
};

const TeaserCard: React.FC<props> = ({ posts, strings, works }) => {
  const title = strings?.title || '';
  const subtitle = strings?.subtitle || '';

  return (
    <div className=" mx-auto" id="blogs">
      <div className="2xl:max-w-screen-xl max-w-sm xl:max-w-screen-lg lg:max-w-screen-md mx-auto pt-6 pb-10">
        <div className="text-left mb-6 mt-6  ">
          <h1 className=" text-3xl lg:text-4xl 2xl:text-5xl  my-10 font-bold dark:text-gray-200 mb-2 ">
            {title}
          </h1>
          <p className="text-gray-400 text-lg mb-7">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {posts &&
            posts.map(post => (
              <div
                className={`rounded-xl py-4  overflow-hidden `}
                key={post.slug}
              >
                <Thumbnail
                  slug={post.slug}
                  src={post.thumbnail}
                  title={post.title}
                />
                <div className="content">
                  <h2 className="text-2xl mt-3 font-bold mb-4 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
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

          {works &&
            works.map(work => (
              <div
                className={`rounded-xl py-4  overflow-hidden `}
                key={work.post?.ID}
              >
                <Thumbnail src={work.img} title={work.post?.post_title} />
                <div className="content">
                  <h2 className="text-2xl mt-3 font-bold mb-4 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                    <a href={work.projecUrl} target="_blank">
                      {work.post?.post_title} &rarr;
                    </a>
                  </h2>

                  <div
                    className="text-gray-600 dark:text-gray-400 mb-3"
                    dangerouslySetInnerHTML={{
                      __html: work?.post?.post_excerpt,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default TeaserCard;
