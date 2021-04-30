import { episode } from '../../store/home/types';

type props = {
  title: string;
  subTitle: string;
  episodes: episode[];
};

type hostProps = {
  item: episode;
};
export { hostProps };
export default props;
