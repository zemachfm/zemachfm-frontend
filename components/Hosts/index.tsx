import React from 'react';
import { HostsProps } from './types.d';
import InstagramIcon from '../../icons/instagram.svg';
import TwitterIcon from '../../icons/twitter.svg';
import LinkedInIcon from '../../icons/linkedin.svg';
import GithubIcon from '../../icons/github.svg';
import ArrowForwardIcon from '../../icons/arrow-right.svg';

const Hosts: React.FC<HostsProps> = props => (
  <section id="hosts">
    <div className="flex flex-col">
      <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
        Hosts
      </h1>
      <p className="text-gray-400 text-lg mb-7">This are your podcast hosts</p>
    </div>
    <div className="grid grid-cols-1 gap-4 justify-between flex-1 lg:grid-cols-2">
      {props.hosts.map(host => (
        <div className="grid lg:grid-cols-6 grid-cols-4 rounded-xl gap-5 bg-white dark:bg-gray-900">
          <figure
            className="flex-col lg:col-span-2 col-span-4 bg-gradient-to-t from-gray-200 to-white px-4 py-4 rounded-l-xl dark:from-gray-900 dark:to-gray-800 w-full"
            key={host.post?.post_title}
          >
            {props.loading ? (
              <div className="w-20 h-20 rounded-full bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
            ) : (
              <img
                alt={host.post?.post_title}
                className="h-22 w-22 md:w-48 md:h-auto mx-auto rounded-full m-6"
                height="512"
                src={host.img}
                width="384"
              />
            )}
          </figure>
          <div className="lg:p-1 p-4 lg:col-span-3 col-span-4 space-y-4 text-left lg:py-4">
            <figcaption className="">
              {props.loading ? (
                <div className=" w-full h-4 bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
              ) : (
                <div className="text-gray-800 text-3xl font-medium dark:text-white">
                  {host.post?.post_title}
                </div>
              )}
              {props.loading ? (
                <div className="w-1/2 h-2 mt-2 bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
              ) : (
                <div className="text-gray-400 text-sm mt-1 ml-1  dark:text-gray-400">
                  Software Engineer, Ethiopia
                </div>
              )}
            </figcaption>

            {props.loading ? (
              <div className="w-full h-40 mt-2 bg-gradient-to-r dark:from-gray-600 from-gray-200 to-gray-300 dark:to-gray-500 bg-gray-200 animate-pulse " />
            ) : (
              <div>
                <blockquote>
                  <p className=" dark:text-gray-100 text-gray-500">
                    {host.post?.post_excerpt}
                  </p>
                </blockquote>
                <div className="flex justify-start border-t-1 flex-1 pt-2">
                  <a href={host.socialMedia?.instagram || ''} target="_blank">
                    <InstagramIcon className="text-red-500" />
                  </a>
                  <a href={host.socialMedia?.twitter || ''} target="_blank">
                    <TwitterIcon className="text-blue-500 ml-6" />
                  </a>
                  <a href={host?.socialMedia?.github || ''} target="_blank">
                    <GithubIcon className="text-gray-900 dark:text-white ml-6" />
                  </a>

                  <a href={host?.socialMedia?.linkedIn || ''} target="_blank">
                    <LinkedInIcon className="text-blue-400 ml-6" />
                  </a>
                </div>

                <div className="mt-2">
                  <a className="text-green-500 font-bold flex gap-2">
                    Read More <ArrowForwardIcon />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Hosts;
