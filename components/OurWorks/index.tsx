import { IOurWorks } from '../../store/home/types.d';
import TeaserCard from '../shared/teaserCard';

interface IOurWorksProps {
  works: IOurWorks;
}

const OurWorks = (props: IOurWorksProps) => (
  <div>
    <TeaserCard
      strings={{
        title: 'Our Works',
        subtitle:
          'This are the current projects and works Zemach is conducting, other than our podcast.',
      }}
      works={props.works}
    />
  </div>
);

export default OurWorks;
