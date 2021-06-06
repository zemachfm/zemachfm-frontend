import { story } from '../../store/home/types.d';

type storyProps = {
  title: string;
  description: string;
  color: string;
};

type storyIndex = {
  story: story;
};

export { storyIndex, storyProps };
