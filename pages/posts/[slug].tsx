/* eslint-disable import/group-exports */
// pages/posts/[slug].tsx
import React, { useState, ReactElement } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { END } from 'redux-saga';
import { fetchGuests, fetchSettings } from '../../store/home/actions';

import Featured from '../../components/blog/featured';
import { IPost } from '../../types/blog.d';
import { SITE_URL } from '../../lib/store/url';
import { wrapper } from '../../store/store';
import { getPost, getAllPosts } from '../../lib/utils/mdxUtils';
import { translatedStrings } from '../../types/index.d';

const components = { Link };

interface returnPath {
  params: {
    slug: string;
  };
  locale: string;
}

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, 'slug'>;
  content: translatedStrings;
  locale: 'en' | 'am';
  slug: string;
  Footer: () => ReactElement;
};

const PostPage: React.FC<Props> = ({
  source,
  frontMatter,
  content,
  locale,
  slug,
  Footer,
}: Props) => {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>{`${frontMatter.title || ''} | ${content.appName || ''}`}</title>
        <meta title={`${frontMatter.title || ''} | ${content.appName || ''}`} />
        <meta content={frontMatter.description || ''} name="description" />
        <meta content="article" property="og:type" />
        <meta
          content={`${frontMatter.title || ''} | ${content.appName || ''}`}
          property="og:title"
        />
        <meta
          content={frontMatter.description || ''}
          property="og:description"
        />
        <meta content={`${SITE_URL}/${slug || ''}`} property="og:url" />
        <meta
          content={`${SITE_URL}/${frontMatter.thumbnail || ''}`}
          property="og:image"
        />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <article className="prose prose-blue">
        <div className="mb-4 relative">
          <div className="w-6/6 py-10 px-2 lg:px-0 flex flex-wrap bg-gray-200 dark:bg-gray-900 mx-auto bg-transparent relative ">
            <div className="xl:w-3/6 w-6/6 mx-auto">
              <img
                alt={`Cover Image for ${frontMatter.title}`}
                className="rounded-xl relative"
                src={frontMatter.thumbnail}
              />
            </div>
          </div>
        </div>

        <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10">
          <h1 className="text-gray-700 lg:text-5xl text-3xl font-bold mb-6 dark:text-gray-200">
            {frontMatter.title}
          </h1>
          <div className="text-lg blog ">
            <MDXRemote {...source} components={components} />
          </div>
        </div>
      </article>
      <div className="border-t-2 border-gray-200 dark:border-gray-900 col-span-7 dark:bg-black">
        <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10">
          {Footer()}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({
    store,
    params,
    locale,
  }: GetStaticPropsContext & {
    store: any;
  }) => {
    const { content, data } = getPost(params?.slug as string, false);

    store.dispatch(fetchSettings(locale));
    store.dispatch(fetchGuests());
    store.dispatch(END);
    await store.sagaTask.toPromise();
    const mdxSource = await serialize(content, {
      scope: data,
    });

    return {
      props: {
        source: mdxSource,
        frontMatter: data,
        slug: params.slug,
      },
    };
  },
);

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { posts } = getAllPosts(['slug']);
  const enPaths: returnPath[] = posts.map(post => ({
    params: {
      slug: post.slug,
    },
    locale: 'en',
  }));

  const enPathsCopy = [...enPaths];
  const amPaths = enPathsCopy.map(zpath => ({
    ...zpath,
    locale: 'am',
  }));
  const paths = [...amPaths, ...enPaths];

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
