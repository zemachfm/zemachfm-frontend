import { FC } from 'react';
import { storyProps } from './index.d';
import Face from '../../icons/smiling-face-outline.svg';

const StoryCard: FC<storyProps> = ({ title, description, color }) => (
  <div
    className={`${
      color === 'bg-green-500'
        ? `${color} dark:bg-green-600`
        : `${color} dark:bg-gray-900`
    } p-4 text-left transition-all duration-200 hover:shadow-sm text-black dark:text-white rounded-lg`}
  >
    <div
      className={`text-3xl  pb-3 mb-4 text-left font-bold dark:text-gray-100 text-gray-900'
      }`}
    >
      {title}
      <span className=" float-right ">
        <Face className="fill-current rounded-full  w-12 h-12 p-2 " />
      </span>
    </div>
    <div
      className={`text-gray-600 dark:text-gray-100 text-sm`}
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  </div>
);

export default StoryCard;
