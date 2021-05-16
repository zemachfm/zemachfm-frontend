import Link from 'next/link';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IHomeReducer } from '../../store/home/types.d';
import { TRootReducer } from '../../store/reducer';
import footerProps from './types.d';
import Spotify from '../../icons/spotify.svg';
import Itunes from '../../icons/itunes.svg';
import GooglePodcast from '../../icons/google-podcasts.svg';
import TwitterIcon from '../../icons/twitter.svg';
import FacebookIcon from '../../icons/facebook.svg';
import GithubIcon from '../../icons/github.svg';
import TelegramIcon from '../../icons/telegram.svg';
import LinkedIn from '../../icons/linkedin.svg';
import Instagram from '../../icons/instagram.svg';

const Footer: FC<footerProps> = ({ content }) => {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const { settings, player, guests } = state;
  const { item } = player.currentPlay;
  const { social, platforms } = settings;
  const playing = !!item;

  const { footer, appName } = content;

  const getIcon = name => {
    switch (name) {
      case 'spotify':
        return <Spotify className="h-4 w-4 fill-current text-green-600 " />;
      case 'googlePodcast':
        return <GooglePodcast className="h-4 w-4 fill-current text-red-400 " />;
      case 'itunes':
        return <Itunes className="h-4 w-4 fill-current text-red-500 " />;

      default:
        return null;
    }
  };

  const renderPlatform = () =>
    Object.entries(platforms).map(platform => {
      if (platform[1]) {
        return (
          <li className="mb-2 flex flex-row items-center">
            {getIcon(platform[0])}
            <a
              className="capitalize ml-2 text-gray-500 hover:text-black dark:hover:text-white dark:text-gray-400"
              href={platform[1]}
            >
              {platform[0]}
            </a>
          </li>
        );
      }
      return null;
    });
  return (
    <div className="my-4 flex flex-col border-t-2 border-gray-200 dark:border-gray-900 col-span-7 dark:bg-black">
      <footer
        className={`py-5 mb-5  margin-auto ${
          playing ? 'mb-32' : ''
        } dark:bg-black`}
      >
        <div className="grid grid-cols-2 items-center lg:grid-cols-3 gap-5">
          <div className=" col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-2xl dark:text-white flex items-center">
              <img
                alt="zemachfm"
                className=" w-20 h-20"
                height="80"
                src="/assets/zemach-small.png"
                width="80"
              />
              <span className="block">{appName}</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-300">
              {footer.subtitle}
            </p>
          </div>
          <ul className="flex flex-col">
            <h3 className="mb-4 text-2xl dark:text-white ">
              {footer.recentEpisodes}
            </h3>

            {guests.episodes.map(episode => (
              <li className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white truncate">
                <Link href={`/podcast/${episode.slug}`}>
                  {episode.title.rendered}
                </Link>
              </li>
            ))}
          </ul>
          <div className="lg:ml-4">
            <h3 className="mb-4 text-2xl dark:text-white">
              {footer.platforms}
            </h3>
            <ul>{renderPlatform()}</ul>
          </div>
          <div className="lg:col-span-3 col-span-2">
            <div className="mt-4 text-gray-600 flex lg:flex-row flex-col">
              <div className="flex flex-row justify-center lg:justify-start mb-4 lg:mb-0 ">
                <a href={social.github} target="_blank" title="github">
                  <GithubIcon className="h-8 w-8 stroke-current text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white  mx-1 " />
                </a>
                <a href={social.twitter} target="_blank" title="twitter">
                  <TwitterIcon className="h-8 w-8  ml-1 mr-0 stoke-current text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400" />
                </a>
                <a href={social.facebook} target="_blank" title="facebook">
                  <FacebookIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500  mr-1 " />
                </a>
                <a href={social.linkedIn} target="_blank" title="linkedIn">
                  <LinkedIn className="h-8 w-8 mx-1 stroke-current text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-700" />
                </a>
                <a href={social.instagram} target="_blank" title="instagram">
                  <Instagram className="h-8 w-8 mx-1 stroke-current text-gray-600 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400" />
                </a>
                <a href={social.telegram} target="_blank" title="telegram">
                  <TelegramIcon className="h-6 w-6 fill-current text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500  ml-0 mr-5  " />
                </a>
              </div>
              <span className="text-center lg:text-left text-gray-500 dark:text-gray-400 block w-full lg:w-auto lg:inline">
                © {footer.copyright}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
