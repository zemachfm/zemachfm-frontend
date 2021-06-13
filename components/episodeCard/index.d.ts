import { episode, siteSettings } from '../../store/home/types.d';

type episodeCard = {
  title?: string;
  image?: string;
  onPlay?: (item: episode) => void;
  onPause?: (type: string) => void;
  onDownload?: (item: episode) => void;
  item?: episode;
  playing?: boolean;
  index?: number;
  playerStatus?: number;
  loading?: boolean;
  settings: siteSettings;
};

type episodeCardsContainerType = {
  title: string;
  subTitle: string;
  starterEpisodes: episode[];
  currentPlay: episode;
  playerStatus: number;
  loading: boolean;
  gotoText: string;
  more: string;
  settings: siteSettings;
  handleRouteChange: (changeTo: string, isMobile?: boolean) => void;
  scrollSpyActive: boolean;
};
export { episodeCard, episodeCardsContainerType };
