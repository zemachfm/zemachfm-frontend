import React from 'react';
import Link from 'next/link';
import VisibilitySensor from 'react-visibility-sensor';
import { HostsProps } from './types.d';
import InstagramIcon from '../../icons/instagram.svg';
import TwitterIcon from '../../icons/twitter.svg';
import LinkedInIcon from '../../icons/linkedin.svg';
import GithubIcon from '../../icons/github.svg';
import routes from '../../lib/constants/hashRoutes';

const Hosts: React.FC<HostsProps> = props => {
  const handleVisibility = (visible: boolean) => {
    if (visible) {
      props.handleRouteChange(routes.hosts);
    }
  };

  return (
    <VisibilitySensor onChange={handleVisibility}>
      <section id="hosts">
        <div className="flex flex-col">
          <h1 className=" text-3xl lg:text-4xl 2xl:text-5xl  my-10 font-bold dark:text-gray-200 mb-2 ">
            {props.content.title}
          </h1>
          <p className="text-gray-400 text-lg mb-7">
            {' '}
            {props.content.subtitle}{' '}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 justify-between flex-1 lg:grid-cols-2">
          {Array.isArray(props.hosts) &&
            props.hosts.map(host => (
              <div
                className="grid 2xl:grid-cols-8 lg:grid-cols-4 grid-cols-4 relative overflow-hidden rounded-xl gap-0 bg-white dark:bg-gray-900"
                key={host.post.ID}
              >
                <figure
                  className="flex flex-col 2xl:col-span-3 col-span-4 lg:col-span-4 bg-gradient-to-t justify-center from-gray-200 to-white rounded-l-xl dark:from-gray-900 dark:to-gray-800 w-full"
                  key={host.post?.post_title}
                >
                  {props.loading ? (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
                  ) : (
                    <img
                      alt={host.post?.post_title}
                      className="w-auto h-auto"
                      src={host.img}
                    />
                  )}
                </figure>
                <div
                  className="w-full lg:p-1 p-4 lg:col-span-5 2xl:relative lg:absolute dark:bg-gray-900 2xl:bg-white lg:dark:bg-gray-900 lg:bg-gray-100 bg-white  lg:bg-opacity-70 lg:dark:bg-opacity-60 bottom-0 z-10 flex flex-col justify-around col-span-4 space-y-4 text-left lg:py-4"
                  style={{ backdropFilter: 'blur(2px)' }}
                >
                  <figcaption className="">
                    {props.loading ? (
                      <div className=" w-full h-4 bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
                    ) : (
                      <Link href={`/host/${host?.post?.post_name}`} passHref>
                        <a>
                          <h4 className="text-gray-800 pl-4 lg:text-2xl md:text-2xl text-xl  font-medium dark:text-gray-200 hover:text-black dark:hover:text-white">
                            {host.post?.post_title}
                          </h4>
                        </a>
                      </Link>
                    )}
                    {props.loading ? (
                      <div className="w-1/2 h-2 mt-2 bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
                    ) : (
                      <div className="text-gray-500 pl-4 text-md mt-1 ml-1  dark:text-gray-400">
                        {host.subtitle}
                      </div>
                    )}
                  </figcaption>
                  {props.loading ? (
                    <div className="w-full h-40 mt-2 bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
                  ) : (
                    <div className="flex flex-col pl-4 justify-between">
                      <blockquote>
                        <p className=" dark:text-gray-100 text-md text-gray-800">
                          {host.post?.post_excerpt}
                        </p>
                      </blockquote>
                      <div className=" border-t dark:border-black border-gray-100 mt-4"></div>
                      <div className="flex justify-start border-t-1 flex-1 mt-1 pt-2 ">
                        <a
                          href={host.socialMedia?.instagram || ''}
                          target="_blank"
                        >
                          <InstagramIcon className="stroke-current 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 hover:text-red-400" />
                        </a>
                        <a
                          href={host.socialMedia?.twitter || ''}
                          target="_blank"
                        >
                          <TwitterIcon className=" ml-6 stroke-current 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 hover:text-blue-400" />
                        </a>
                        <a
                          href={host?.socialMedia?.github || ''}
                          target="_blank"
                        >
                          <GithubIcon className="stroke-current 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 ml-6 hover:text-black dark:hover:text-white" />
                        </a>

                        <a
                          href={host?.socialMedia?.linkedIn || ''}
                          target="_blank"
                        >
                          <LinkedInIcon className="stroke-current relative 2xl:text-gray-400 lg:text-gray-500 dark:text-gray-400 ml-6 hover:text-blue-500" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </VisibilitySensor>
  );
};

export default Hosts;
