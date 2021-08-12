import { FC } from 'react';
import { IOurWorks } from '../../store/home/types.d';
import { hosts } from '../../types/index.d';
import TeaserCard from '../shared/teaserCard';

type IOurWorksProps = {
  works: IOurWorks;
  strings: hosts;
};

const OurWorks: FC<IOurWorksProps> = ({ works, strings }) => (
  <div>
    <TeaserCard
      strings={{
        title: strings?.title,
        subtitle: strings?.subtitle,
      }}
      works={works}
    />
  </div>
);

export default OurWorks;
