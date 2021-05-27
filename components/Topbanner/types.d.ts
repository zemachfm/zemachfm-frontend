import { episode } from '../../store/home/types.d';
import { ITopBannerContent } from '../../types/index.d';

export interface IToBannerProps {
  recentEpisode?: episode;
  topBannerContent: ITopBannerContent;
}
