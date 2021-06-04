import { FC } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { storyIndex } from './index.d';
import StoryCard from './storyCard';

import routes from '../../lib/constants/hashRoutes';

const OurStory: FC<storyIndex> = ({ story, handleRouteChange }) => {
  const { storyLine, cards, numberOfCards } = story;
  const { title, description } = storyLine;
  const colors = ['bg-green-500', 'bg-gray-200', 'bg-gray-200', 'bg-gray-200'];

  const handleVisibility = (visible: boolean) => {
    if (visible) {
      handleRouteChange(routes.story);
    }
  };

  return (
    <VisibilitySensor onChange={handleVisibility}>
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
          className={`grid gap-6 md:grid-cols-2 grid-cols-1 2xl:grid-cols-2`}
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
    </VisibilitySensor>
  );
};
export default OurStory;
