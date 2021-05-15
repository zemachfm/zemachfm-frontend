import { FC } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import { wrapper } from '../../store/store';
import { fetchSinglePodcast } from '../../store/podcastSingle/actions';
import { TRootReducer } from '../../store/reducer';
import singlePodcastDataTypes from '../../store/podcastSingle/types.d';
import singlePodcastType from '../../types/singlePodcast.d';

const SinglePodcast: FC<singlePodcastType> = ({
  locale,
  content,
  slug,
  Footer,
}) => {
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
        <div className="xl:w-3/6 w-6/6 px-5 mx-auto pt-20 pb-28 ">
          <h1
            className="text-3xl lg:text-4xl 2xl:text-5xl   text-left dark:text-white mt-4 mb-3 font-bold"
            dangerouslySetInnerHTML={{
              __html: singlePodcastState[slug][0].title.rendered,
            }}
          ></h1>
          <div className="flex flex-row gap-4 text-gray-600 dark:text-gray-400 mb-8 text-lg">
            <p> recorded {singlePodcastState[slug][0].meta.date_recorded} </p> -
            <p> duration {singlePodcastState[slug][0].meta.duration} </p> -
            <p> size {singlePodcastState[slug][0].meta.filesize} </p>
          </div>

          <div
            className="w-full text-lg text-gray-600 dark:text-gray-200 fill-current "
            dangerouslySetInnerHTML={{
              __html: singlePodcastState[slug][0].content.rendered,
            }}
          ></div>
          {Footer()}
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
    return {
      props: {
        locale,
        slug: params.slug,
      },
    };
  },
);
const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default SinglePodcast;
export { getStaticPaths, getStaticProps };
