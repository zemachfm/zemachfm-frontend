import React from 'react';

import { SideBarProps } from './index.d';

const SideBar: React.FC<SideBarProps> = props => (
  <div className="lg:flex pb-5 flex-col w-32 items-center fixed bg-transparent dark:bg-black rounded-xl hidden top-40">
    <ul>
      {props.links.map(link => (
        <a
          href={link.route}
          key={link.label}
          onClick={() => props.handleRouteChange(link.route)}
        >
          <li
            className={`mt-5 flex flex-row items-center py-5 w-26 px-3 ${
              link.active ? ' bg-gray-200 dark:bg-gray-900' : ''
            } rounded-xl dark:text-white text-black cursor-pointer`}
          >
            {link.icon}
            <span className="ml-2">{link.label}</span>
          </li>
        </a>
      ))}
    </ul>
  </div>
);

export default SideBar;
