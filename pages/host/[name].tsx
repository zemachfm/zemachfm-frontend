import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import path from 'path';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import fs from 'fs';
import { wrapper } from '../../store/store';
import { fetchHost } from '../../store/host/actions';
import { TRootReducer } from '../../store/reducer';
import IHostPageState from '../../store/host/types';
import { hostPageType } from '../../types/index.d';

const SinglePodcast: FC<hostPageType> = ({ locale, content, name }) => {
  const hostPageState: IHostPageState = useSelector(
    (root: TRootReducer) => root.host,
  );

  return (
    <div>
      <Head>
        <title> {hostPageState?.host?.post?.post_title} </title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="xl:w-3/6 w-6/6 px-5 mx-auto mt-20">
        <h1
          className="text-6xl  text-left my-4 font-bold"
          dangerouslySetInnerHTML={{
            __html: hostPageState?.host?.post?.post_title,
          }}
        ></h1>
        <div
          className="w-full text-lg text-gray-600 dark:text-gray-200 fill-current "
          dangerouslySetInnerHTML={{
            __html: hostPageState?.host?.post?.post_content,
          }}
        ></div>
      </div>
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
    store.dispatch(fetchHost(params.name.toString()));
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
        name: params.name,
      },
    };
  },
);
const getStaticPaths: GetStaticPaths<{ name: string }> = async ({ name }) => ({
  paths: [],
  fallback: 'blocking',
});

export default SinglePodcast;
export { getStaticPaths, getStaticProps };
