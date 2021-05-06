import { FC } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import path from 'path';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import fs from 'fs';
import { wrapper } from '../../store/store';
import { fetchSinglePodcast } from '../../store/podcastSingle/actions';
import { TRootReducer } from '../../store/reducer';
import singlePodcastDataTypes from '../../store/podcastSingle/types.d';
import singlePodcastType from '../../types/singlePodcast.d';

const SinglePodcast: FC<singlePodcastType> = ({ locale, content, slug }) => {
  const singlePodcastState: singlePodcastDataTypes = useSelector(
    (root: TRootReducer) => root.singlePodcast,
  );

  return (
    <div className="dark:bg-black bg-gray-50">
      <Head>
        <title>
          {' '}
          {singlePodcastState[slug]
            ? singlePodcastState[slug][0].title.rendered
            : 'loading'}{' '}
        </title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {singlePodcastState[slug] ? (
        <div className="xl:w-3/6 w-6/6 px-5 mx-auto pt-20 pb-20 ">
          <h1
            className="text-6xl  text-left my-4 font-bold"
            dangerouslySetInnerHTML={{
              __html: singlePodcastState[slug][0].title.rendered,
            }}
          ></h1>
          <div
            className="w-full text-lg text-gray-600 dark:text-gray-200 fill-current "
            dangerouslySetInnerHTML={{
              __html: singlePodcastState[slug][0].content.rendered,
            }}
          ></div>
        </div>
      ) : null}
    </div>
  );
};

const getStaticProps = wrapper.getStaticProps(
  async ({
    store,
    locale,
    params,
  }: GetStaticPropsContext & {
    store: any;
  }) => {
    store.dispatch(fetchSinglePodcast(params.slug.toString()));
    store.dispatch(END);
    await store.sagaTask.toPromise();
    const dir = path.join(process.cwd(), 'public', 'static');
    const filePath = `${dir}/${locale}.json`;
    const buffer = fs.readFileSync(filePath);
    const content = JSON.parse(buffer.toString());
    return {
      props: {
        content,
        locale,
        slug: params.slug,
      },
    };
  },
);
const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({ slug }) => ({
  paths: [],
  fallback: 'blocking',
});

export default SinglePodcast;
export { getStaticPaths, getStaticProps };
