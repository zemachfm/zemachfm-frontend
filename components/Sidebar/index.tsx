import React from 'react';
import Link from 'next/link';
import GridIcon from '../../icons/grid.svg';
import RadioIcon from '../../icons/radio.svg';
import UsersIcon from '../../icons/users.svg';
import MessageIcon from '../../icons/message-circle.svg';
import BookIcon from '../../icons/book.svg';
import { SideBarProps } from './index.d';

const SideBar: React.FC<SideBarProps> = props => (
  <div className="lg:flex pb-5 flex-col w-32 items-center fixed bg-transparent dark:bg-black rounded-xl hidden top-1/4">
    <ul>
      <Link href="#hosts">
        <li className="mt-5 flex flex-col items-center py-5 w-24  bg-gray-200 dark:bg-gray-900 rounded-xl dark:text-white text-black cursor-pointer">
          <GridIcon />
          <span>{props.sideBarContents.episodes}</span>
        </li>
      </Link>
      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <UsersIcon />
        <span>{props.sideBarContents.hosts}</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <RadioIcon />
        <span>{props.sideBarContents.guests}</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <BookIcon />
        <span>{props.sideBarContents.story}</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <MessageIcon />
        <span>{props.sideBarContents.contact}</span>
      </li>
    </ul>
  </div>
);

export default SideBar;
