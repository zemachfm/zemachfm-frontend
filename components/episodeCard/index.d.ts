import { episode } from '../../store/home/types.d';

type episodeCard = {
  title: string;
  image?: string;
  onPlay: (item: episode) => void;
  onPause: (type: string) => void;
  onDownload: (item: episode) => void;
  item: episode;
  playing: boolean;
  index: number;
  playerStatus: number;
};

type episodeCardsContainerType = {
  title: string;
  subTitle: string;
  starterEpisodes: episode[];
  currentPlay: episode;
  playerStatus: number;
};
export { episodeCard, episodeCardsContainerType };
