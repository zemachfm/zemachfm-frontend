import { FC } from 'react';
import { IOurWorks } from '../../store/home/types.d';
import TeaserCard from '../shared/teaserCard';

type IOurWorksProps = {
  works: IOurWorks;
};

const OurWorks: FC<IOurWorksProps> = ({ works }) => (
  <div>
    <TeaserCard
      strings={{
        title: 'Our Works',
        subtitle:
          'This are the current projects and works Zemach is conducting, other than our podcast.',
      }}
      works={works}
    />
  </div>
);

export default OurWorks;
