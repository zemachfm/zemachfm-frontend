import {
  IFullSocialMedias,
  platforms,
  episode,
} from '../../store/home/types.d';
import { translatedStrings } from '../../types/index.d';

type footerProps = {
  content: translatedStrings;
  playing: boolean;
  social: IFullSocialMedias;
  platforms: platforms;
  guests: episode[];
};

export default footerProps;
