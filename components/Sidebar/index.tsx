import React from 'react';
import Link from 'next/link';
import { SideBarProps } from './index.d';

const SideBar: React.FC<SideBarProps> = props => (
  <div className="lg:flex pb-5 w-2/12 flex-col pr-10  fixed bg-transparent rounded-xl hidden top-28">
    <ul>
      {props.links.map(link => (
        <a
          href={link.route}
          key={link.label}
          onClick={() => props.handleRouteChange(link.route)}
        >
          <li
            className={`mt-5 flex flex-row items-start justify-start py-3 w-full px-3 pr-6 ${
              link.active ? 'bg-gray-200 dark:bg-gray-900 rounded-r-full ' : ''
            } rounded-xl dark:text-white text-gray-800 cursor-pointer`}
          >
            {link.icon}
            <span className="ml-4">{link.label}</span>
          </li>
        </a>
      ))}
    </ul>
    <div className="border-t dark:border-gray-900 border-gray-200 mt-4 pl-5 pt-4 w-full ">
      <ul>
        <li className="li text-md dark:text-gray-400 text-gray-500 py-3">
          <Link href="/feed/podcast.xml">{props.translatedStrings.feed}</Link>
        </li>
        <li className="li text-md dark:text-gray-400 text-gray-500 py-3">
          <a href="mailto:zemachfm@gmal.com" target="_blank">
            {props.translatedStrings.emailUs}
          </a>
        </li>
        <li className="li text-sm dark:text-gray-600 text-gray-400 py-3">
          {props.translatedStrings.appVersion}
        </li>
      </ul>
    </div>
  </div>
);

export default SideBar;
