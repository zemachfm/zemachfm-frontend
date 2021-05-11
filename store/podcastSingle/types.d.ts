import { episode } from '../home/types.d';

interface singlePodcastDataTypes {
  loading: boolean;
  [key?: string]: boolean | episode;
}

export default singlePodcastDataTypes;
