import React from 'react';
import GridIcon from '../../icons/grid.svg';
import RadioIcon from '../../icons/radio.svg';
import UsersIcon from '../../icons/users.svg';
import MessageIcon from '../../icons/message-circle.svg';
import BookIcon from '../../icons/book.svg';
import CloseIcon from '../../icons/x.svg';
import { SmallDeviceMenuProps } from './index.d';

const SmallDeviceSideBar: React.FC<SmallDeviceMenuProps> = props => (
  <div className="lg:hidden block bg-white dark:bg-gray-800 dark:text-white fixed w-full h-screen z-30 font-bold">
    <div className="mt-5 px-5 flex items-center justify-between">
      <h3 className="text-3xl text-yellow-400">Menu</h3>
      <button onClick={props.toogleMenu}>
        <CloseIcon />
      </button>
    </div>

    <ul className="flex flex-col h-full px-5">
      <li className="flex bg-yellow-400 mt-10 text-gray-700 rounded-r-full py-3 px-1">
        <GridIcon className="mr-5" />
        <span>Episodes</span>
      </li>

      <li className="flex py-3 mt-10 px-1">
        <UsersIcon className="mr-5" />
        <span>Hosts</span>
      </li>

      <li className="flex py-3 mt-10 px-1">
        <RadioIcon className="mr-5" />
        <span>Guests</span>
      </li>

      <li className="flex py-3 mt-10 px-1">
        <BookIcon className="mr-5" />
        <span>Story</span>
      </li>

      <li className="flex py-3 mt-10 px-1">
        <MessageIcon className="mr-5" />
        <span>Contact</span>
      </li>
    </ul>
  </div>
);
export default SmallDeviceSideBar;
