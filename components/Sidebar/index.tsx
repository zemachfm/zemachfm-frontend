import React from 'react';

import { SideBarProps } from './index.d';

const SideBar: React.FC<SideBarProps> = props => (
  <div className="lg:flex pb-5 w-2/12 flex-col pr-10  fixed bg-transparent dark:bg-black rounded-xl hidden top-28">
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
      <ul className="li text-sm dark:text-gray-400 text-gray-600 py-3">
        First one
      </ul>
      <ul className="li text-sm dark:text-gray-400 text-gray-600 py-3">
        Second one
      </ul>
      <ul className="li text-sm  dark:text-gray-400 text-gray-600 py-3">
        Third one
      </ul>
      <ul className="li text-sm dark:text-gray-400 text-gray-600 py-3">
        Another one
      </ul>
    </div>
  </div>
);

export default SideBar;
