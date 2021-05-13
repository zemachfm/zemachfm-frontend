import { IFullSocialMedias, platforms } from '../../store/home/types.d';
import { translatedStrings } from '../../types/index.d';

type footerProps = {
  content: translatedStrings;
  playing: boolean;
  social: IFullSocialMedias;
  platforms: platforms;
};

export default footerProps;
