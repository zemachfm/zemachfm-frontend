import axios from 'axios';
import JsonFeedToRss from 'jsonfeed-to-atom';
import { title } from 'process';
import feeded from 'rss-parser';
import { RSS_URL } from '../../lib/store/url';

const parser = new feeded();

const blogPostsRssXml = blogPosts => {
  let latestPostDate = '';
  let rssItemsXml = '';
  const iterate = [...blogPosts];
  iterate.map(post => {
    const postDate = Date.parse(post.pubDate);
    // Remember to change this URL to your own!
    const postHref = `${post.link}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.isoDate;
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postHref}</link>
        <pubDate>${post.pubDate}</pubDate>
        <dc:creator>${post['dc:creator']}</dc:creator>
        <guid isPermaLink="false">${postHref}</guid>
        <description>
        <![CDATA[${post.content}]]>
        </description>
        <content:encoded>
          <![CDATA[${post['content:encoded']}]]>
        </content:encoded>
        <enclosure url='${post.enclosure.url}' length='${post.enclosure.length}' type='${post.enclosure.type}'> </enclosure>
        <itunes:summary>
        ${post.itunes.summary}
        </itunes:summary>
        <itunes:image href='${post.itunes.image}' >
        </itunes:image>
        <image>
			<url> ${post.itunes.image} </url>
			<title> ${post.title} </title>
      <itunes:explicit> ${post.itunes.explicit} </itunes:explicit>
      <itunes:duration> ${post.itunes.duration} </itunes:duration>
      <itunes:author> ${post.itunes.author} </itunes:author>
      <itunes:block>no</itunes:block>


		</image>

    </item>`;
    return post;
  });
  return rssItemsXml;
};

const getRssXml = blogPosts => {
  const rssItemsXml = blogPostsRssXml(blogPosts.items);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
    <title>${blogPosts.title} </title>
		<atom:link href="https://zemachfm.com/feed/podcast" rel="self" type="application/rss+xml"/>
		<link>https://zemachfm.com/</link>
		<description> ${blogPosts.description} </description>
		<lastBuildDate> ${blogPosts.lastBuildDate} </lastBuildDate>
		<language> ${blogPosts.language} </language>
		<copyright> ${blogPosts.copyright} </copyright>
		<itunes:subtitle> ${blogPosts.itunes.subtitle} </itunes:subtitle>
		<itunes:author> ${blogPosts.itunes.author} </itunes:author>
					<itunes:type> ${blogPosts.itunes.type} </itunes:type>
					<itunes:summary> ${blogPosts.itunes.summary} </itunes:summary>
		<itunes:owner>
			<itunes:name> ${blogPosts.itunes.name} </itunes:name>
			<itunes:email> ${blogPosts.itunes.email} </itunes:email>
		</itunes:owner>
		<itunes:explicit> ${blogPosts.itunes.explicit} </itunes:explicit>
					<itunes:image href="${blogPosts.itunes.image.url}"></itunes:image>
			<image>
				<url> ${blogPosts.itunes.image.url} </url>
				<title> ${blogPosts.itunes.image.title} </title>
				<link> ${blogPosts.itunes.image.link} </link>
			</image>
					<itunes:category text="${blogPosts.itunes.category[0]}">
							</itunes:category>
							<itunes:category text="${blogPosts.itunes.category[1]}">
									<itunes:category text="${blogPosts.itunes.category[2]}"></itunes:category>
							</itunes:category>
							<itunes:category text="${blogPosts.itunes.category[3]}">
							</itunes:category>
						
		<generator>zemachfm.com</generator>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const RSSFeed = props => getRssXml(props.items);

const getStaticProps = async context => {
  const RSSFeedData = await parser.parseURL(RSS_URL);

  return {
    props: JSON.parse(JSON.stringify(RSSFeedData)),
  };
};

export { getStaticProps };
export default RSSFeed;
