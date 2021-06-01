import fs from 'fs';
import Feeds from 'rss-parser';
import { RSS_URL } from '../../lib/store/url';

const parser = new Feeds();

const blogPostsRssXml = blogPosts => {
  let latestPostDate = '';
  let rssItemsXml = '';
  const iterate = [...blogPosts];
  iterate.map(post => {
    const postDate = Date.parse(post.pubDate);
    // Remember to change this URL to your own!
    const postHref = `${post.link.repalce('api.zemachfm', 'zemachfm')}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.isoDate;
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[${post?.title}]]></title>
        <link><![CDATA[${postHref}]]></link>
        <pubDate>${post?.pubDate}</pubDate>
        <dc:creator>${post?.creator}</dc:creator>
        <guid isPermaLink="false"><![CDATA[${postHref.replace(
          'api.zemachfm',
          'zemachfm',
        )}]]></guid>
        <description>
        <![CDATA[${post?.content}]]>
        </description>
        <itunes:subtitle><![CDATA[${
          post?.itunes?.subtitle
        } ]]></itunes:subtitle>
        <content:encoded>
          <![CDATA[${post['content:encoded']}]]>
        </content:encoded>
        <enclosure url='${post?.enclosure?.url}' length='${
      post?.enclosure?.length
    }' type='${post?.enclosure?.type}'> </enclosure>
        <itunes:summary>
        <![CDATA[${post?.itunes?.summary}]]>
        </itunes:summary>
        <itunes:image href='${post?.itunes?.image}'>
        </itunes:image>
        <image>
			    <url> ${post?.itunes?.image} </url>
			    <title> ${post?.title} </title>
    		</image>
        <itunes:explicit>${post?.itunes?.explicit}</itunes:explicit>
	      <itunes:block>no</itunes:block>
	      <itunes:duration> ${post?.itunes?.duration} </itunes:duration>
	      <itunes:author> ${post?.itunes?.author} </itunes:author>

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
    version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
	 xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	 xmlns:dc="http://purl.org/dc/elements/1.1/"
	 xmlns:atom="http://www.w3.org/2005/Atom"
	 xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	 xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	 xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
	 xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0"
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
				<itunes:type>episodic</itunes:type>
					<itunes:summary> ${blogPosts.itunes.summary} </itunes:summary>
		<itunes:owner>
			<itunes:name> ${blogPosts.itunes.owner.name} </itunes:name>
			<itunes:email> ${blogPosts.itunes.owner.email} </itunes:email>
		</itunes:owner>
		<itunes:explicit> ${blogPosts.itunes.explicit} </itunes:explicit>
		<itunes:image href="${blogPosts.itunes.image}"></itunes:image>
			<image>
				<url> ${blogPosts.image.url} </url>
				<title> ${blogPosts.image.title} </title>
				<link> ${blogPosts.image.link} </link>
			</image>
      <itunes:category text="${blogPosts.itunes.categoriesWithSubs[0].name}">
			</itunes:category>
      <itunes:category text="${blogPosts.itunes.categoriesWithSubs[1].name}">
      <itunes:category text="${blogPosts.itunes.categoriesWithSubs[1].subs[0].name}"></itunes:category>
			</itunes:category>
      <itunes:category text="${blogPosts.itunes.categoriesWithSubs[2].name}">
			</itunes:category>
									
		<generator>zemachfm.com</generator>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const MakeRSS = async () => {
  const RSSFeedData = await parser.parseURL(RSS_URL);
  const processedXml = getRssXml(RSSFeedData);
  fs.writeFileSync('./public/rss.xml', processedXml);
};

export default MakeRSS;
