import { FC } from 'react';
import { storyIndex } from './index.d';
import StoryCard from './storyCard';

const OurStory: FC<storyIndex> = ({ story }) => {
  const { storyLine, cards, numberOfCards } = story;
  const { title, description } = storyLine;
  const colors = [
    'bg-green-500',
    'bg-indigo-500',
    'bg-yellow-500',
    'bg-red-500',
  ];

  return (
    <div id="our-story">
      <h1 className=" text-6xl font-bold mt-8 mb-3 dark:text-white text-gray-900 ">
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
