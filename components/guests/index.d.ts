import { episode } from '../../store/home/types.d';

type props = {
  title: string;
  subTitle: string;
  episodes: episode[];
  loading: boolean;
  more: string;
  playerStatus: number;
  currentPlay: episode;
};

type hostProps = {
  item: episode;
  playing: boolean;
  playerStatus?: number;
  loading?: number;
  onPlay: (item: episode) => void;
  onPause: (item: string) => void;
};
export { hostProps };
export default props;
