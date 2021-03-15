import React from 'react';
import GridIcon from '../../icons/grid.svg';
import RadioIcon from '../../icons/radio.svg';
import UsersIcon from '../../icons/users.svg';
import MessageIcon from '../../icons/message-circle.svg';
import BookIcon from '../../icons/book.svg';

const SideBar: React.FC<null> = () => (
  <div className="flex py-5 flex-col w-32 h-3/4 items-center fixed bg-transparent dark:bg-black rounded-xl">
    <ul>
      <li className="mt-5 flex flex-col items-center py-5 w-24  bg-gray-200 dark:bg-gray-900 rounded-xl dark:text-white text-black">
        <GridIcon />
        <span>Episodes</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <UsersIcon />
        <span>Hosts</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <RadioIcon />
        <span>Guests</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <BookIcon />
        <span>Story</span>
      </li>

      <li className="mt-5 flex flex-col items-center py-5 w-24 bg-transparent  dark:bg-black rounded-xl dark:text-gray-400 text-black">
        <MessageIcon />
        <span>Contact</span>
      </li>
    </ul>
  </div>
);

export default SideBar;
