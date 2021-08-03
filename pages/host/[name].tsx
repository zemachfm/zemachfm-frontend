import { FC } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import { wrapper } from '../../store/store';
import { fetchHost } from '../../store/host/actions';
import { TRootReducer } from '../../store/reducer';
import IHostPageState from '../../store/host/types';
import { hostPageType } from '../../types/index.d';
import InstagramIcon from '../../icons/instagram.svg';
import TwitterIcon from '../../icons/twitter.svg';
import LinkedInIcon from '../../icons/linkedin.svg';
import GithubIcon from '../../icons/github.svg';
import { fetchGuests, fetchSettings } from '../../store/home/actions';
import { axiosGet } from '../../lib/store/axiosReq';
import { HOSTS_URL } from '../../lib/store/url';

const SingleHost: FC<hostPageType> = ({ locale, content, name, Footer }) => {
  const hostPageState: IHostPageState = useSelector(
    (root: TRootReducer) => root.host,
  );

  return (
    <div className="dark:bg-black bg-gray-100">
      <Head>
        <title> {hostPageState?.host?.post?.post_title} </title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="lg:max-w-screen-lg max-w-sm mx-auto mt-20 ">
        <img
          alt={hostPageState?.host?.post?.post_title}
          className="h-22 w-22 md:w-48 md:h-auto mx-auto rounded-full m-6"
          height="512"
          src={hostPageState?.host?.img}
          width="384"
        />
        <div className=" py-4">
          <h1
            className="text-3xl lg:text-4xl 2xl:text-5xl dark:text-gray-100  text-center mt-4 mb-1 font-bold"
            dangerouslySetInnerHTML={{
              __html: hostPageState?.host?.post?.post_title,
            }}
          ></h1>
          <p className="text-lg text-gray-500 text-center dark:text-gray-400 mb-4">
            {hostPageState?.host?.subtitle}
          </p>
          <div
            className="w-full text-lg text-gray-700 text-center dark:text-gray-200 fill-current "
            dangerouslySetInnerHTML={{
              __html: hostPageState?.host?.post?.post_content,
            }}
          ></div>
          <div className="flex justify-center lg:mt-6 mt-3 border-t-1 flex-1 pt-2 ">
            <a
              href={hostPageState?.host?.socialMedia?.instagram || ''}
              target="_blank"
            >
              <InstagramIcon className="stroke-current 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 hover:text-red-400" />
            </a>
            <a
              href={hostPageState?.host?.socialMedia?.twitter || ''}
              target="_blank"
            >
              <TwitterIcon className=" ml-6 stroke-current 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 hover:text-blue-400" />
            </a>
            <a
              href={hostPageState?.host?.socialMedia?.github || ''}
              target="_blank"
            >
              <GithubIcon className="stroke-current 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 ml-6 hover:text-black dark:hover:text-white" />
            </a>

            <a
              href={hostPageState?.host?.socialMedia?.linkedIn || ''}
              target="_blank"
            >
              <LinkedInIcon className="stroke-current relative 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 ml-6 hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-200 mt-6 dark:border-gray-900 col-span-7 dark:bg-black">
        <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10">
          {Footer()}
        </div>
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
    store.dispatch(fetchSettings(locale));
    store.dispatch(fetchGuests());
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {
        locale,
        name: params.name,
      },
    };
  },
);
const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
  const hosts = await axiosGet(HOSTS_URL, {});
  const paths = hosts.data.map(host => ({
    params: { name: encodeURI(host?.identifier) },
    locale: host.lang.slug,
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default SingleHost;
export { getStaticPaths, getStaticProps };
