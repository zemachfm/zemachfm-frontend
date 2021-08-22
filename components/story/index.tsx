import { FC } from 'react';
import { storyIndex } from './index.d';
import StoryCard from './storyCard';

import routes from '../../lib/constants/hashRoutes';

const OurStory: FC<storyIndex> = ({ story }) => {
  const { storyLine, cards, numberOfCards } = story;
  const { title, description } = storyLine;
  const colors = [
    'bg-primary-100 border-2 dark:bg-primary-700 dark:border-primary-800 border-primary-200',
    'bg-white border-2 border-white hover:border-primary-200 hover:bg-primary-100 dark:bg-gray-900 dark:border-gray-900',
    'bg-white border-2 border-white hover:border-primary-200 hover:bg-primary-100 dark:bg-gray-900 dark:border-gray-900',
    'bg-white border-2 border-white hover:border-primary-200 hover:bg-primary-100 dark:bg-gray-900 dark:border-gray-900',
  ];

  return (
    <div id="our-story">
      <h1 className=" text-3xl lg:text-4xl 2xl:text-5xl  font-bold mt-8 mb-3 dark:text-white text-gray-900 ">
        {' '}
        {title}{' '}
      </h1>
      <div
        className="text-gray-400 mb-5 "
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div
        className={`grid gap-6 md:grid-cols-2 grid-cols-1 xl:grid-cols-${numberOfCards}`}
      >
        {cards
          ? cards.map((card, index) =>
              card.title ? (
                <StoryCard
                  color={colors[index]}
                  description={card.description}
                  key={card.title}
                  title={card.title}
                />
              ) : null,
            )
          : null}
      </div>
    </div>
  );
};
export default OurStory;
