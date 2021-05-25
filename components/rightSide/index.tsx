import { FC } from 'react';
import rightSideProps from './types.d';

const RightSidebar: FC<rightSideProps> = ({ content }) => (
  <div className="flex flex-col rounded-2xl px-4 overflow-hidden ">
    <div className="w-full h-auto">
      <img
        alt=""
        className="rounded-2xl"
        src={content.image.sizes['big-thumb']}
      />
    </div>

    <div className="py-2 mt-5 border-gray-200 ">
      <p className="mb-4 dark:text-gray-100 text-xl ">{content.title}</p>
      <div
        className="text-gray-500 dark:text-gray-400 mb-6"
        dangerouslySetInnerHTML={{ __html: content.content }}
      ></div>
      <a className="dark:text-gray-100" href={content.link.url}>
        {content.link.title}
      </a>
    </div>
  </div>
);

export default RightSidebar;
