// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MakeRSS from '../../components/Rss/podcast';

export default async (req, res) => {
  await MakeRSS();
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
