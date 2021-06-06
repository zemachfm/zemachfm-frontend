import React from 'react';
import Link from 'next/link';
import GridIcon from '../../icons/grid.svg';
import RadioIcon from '../../icons/radio.svg';
import UsersIcon from '../../icons/users.svg';
import MessageIcon from '../../icons/message-circle.svg';
import BookIcon from '../../icons/book.svg';
import CloseIcon from '../../icons/x.svg';
import { SmallDeviceMenuProps } from './index.d';

const SmallDeviceSideBar: React.FC<SmallDeviceMenuProps> = props => (
  <div className="lg:hidden block bg-white dark:bg-gray-800 dark:text-white top-0 fixed w-full h-screen z-30 font-bold overflow-y-scroll">
    <div className="mt-5 px-5 flex items-center justify-between">
      <h3 className="text-3xl text-green-500">Menu</h3>
      <button onClick={props.toogleMenu}>
        <CloseIcon />
      </button>
    </div>

    <ul className="flex flex-col h-full px-5">
      {props.links.map(link => (
        <a
          href={link.route}
          onClick={() => props.handleRouteChange(link.route, true)}
        >
          <li
            className={`flex ${
              link.active ? 'bg-green-500  text-gray-700 rounded-r-full ' : ''
            } py-3 mt-10 px-1`}
          >
            {link.icon}
            <span className="ml-3">{link.label}</span>
          </li>
        </a>
      ))}
      <div className="border-t dark:border-gray-900 border-gray-200 mt-4 pl-5 pt-4 w-full "></div>
      <li className="li text-md dark:text-gray-400 text-gray-500 py-3">
        <Link href="/feed/podcast.xml" locale="en">
          {props.translatedStrings.feed}
        </Link>
      </li>
      <li className="li text-md dark:text-gray-400 text-gray-500 py-3">
        <a href="https://t.me/joinchat/SQ-J1gTeld5N_RKJ" target="_blank">
          {props.translatedStrings.group}
        </a>
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
);
export default SmallDeviceSideBar;
