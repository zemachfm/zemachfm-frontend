import axios from 'axios';
import JsonFeedToRss from 'jsonfeed-to-atom';
import feeded from 'rss-parser';
import { RSS_URL } from '../../lib/store/url';

const parser = new feeded();

const RSSFeed = props => {
  console.log('props', props);

  return JsonFeedToRss(props, {
    idIsPermalink: false, // if guid is the permalink, you can set this true

    itunes: true, // generate RSS feed with iTunes extensions
  });
};

const getStaticProps = async context => {
  const RSSFeedData = await parser.parseURL(RSS_URL);

  return {
    props: JSON.parse(JSON.stringify(RSSFeedData)),
  };
};

export { getStaticProps };
export default RSSFeed;
