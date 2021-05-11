import { FC } from 'react';
import { storyProps } from './index.d';
import Face from '../../icons/smiling-face-outline.svg';

const StoryCard: FC<storyProps> = ({ title, description, color }) => (
  <div
    className={`${color} dark:bg-gray-900 p-4 text-left transition-all duration-100 hover:shadow-xl text-black rounded-lg`}
  >
    <div
      className={`text-3xl  dark:border-gray-800 text-white border-gray-50 pb-3 mb-4 text-left font-bold`}
    >
      {title}
      <span className=" float-right ">
        <Face className="fill-current rounded-full text-gray-200 w-12 h-12 p-2 " />
      </span>
    </div>
    <div
      className="text-gray-100 dark:text-gray-300 text-sm"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  </div>
);

export default StoryCard;
