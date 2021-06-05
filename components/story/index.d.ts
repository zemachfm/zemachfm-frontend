import { story } from '../../store/home/types.d';

type storyProps = {
  title: string;
  description: string;
  color: string;
};

type storyIndex = {
  story: story;
  handleRouteChange: (changeTo: string, isMobile?: boolean) => void;
  scrollSpyActive: boolean;
};

export { storyIndex, storyProps };
