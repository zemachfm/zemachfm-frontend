import React from 'react';
import { createRipples } from 'react-ripples';
import Image from 'next/image';
import Link from 'next/link';
import PopOver from '@bit/mui-org.material-ui.popover';
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import { episodeCard } from './index.d';
import PlayIcon from '../../icons/play.svg';
import PauseIcon from '../../icons/pause.svg';
import ShareIcon from '../../icons/share-outline.svg';
import Spotify from '../../icons/spotify.svg';
import GooglePodcast from '../../icons/google-podcasts.svg';
import DownloadOutline from '../../icons/cloud-download-outline.svg';

const Ripples = createRipples({
  during: 500,
});

const EpisodeCard: React.FC<episodeCard> = ({
  title,
  image,
  onPlay,
  onPause,
  onDownload,
  item,
  playing,
  playerStatus,
  loading,
  settings,
}) => {
  const [showShare, setShowShare] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const containerRef = React.useRef();
  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      handleClose();
    });
    return window.removeEventListener('scroll', () => {
      handleClose();
    });
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setShowShare(true);
  };

  const onPlatformClick = (url: string) => {
    window.open(url, '_blank').focus();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowShare(false);
  };

  const PlayStatus = type => {
    switch (type) {
      case 0:
        return (
          <Ripples className="rounded-full animate-pulse hover:bg-gray-300 mx-auto p-2 dark:hover:bg-black dark:border-gray-900">
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-green-500 " />
          </Ripples>
        );
      case 1:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-gray-300 mx-auto p-2 dark:hover:bg-black dark:border-gray-900"
            onClick={() => onPause('PAUSE')}
          >
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-green-500 " />
          </Ripples>
        );
      case 2:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-gray-300 mx-auto p-2 dark:hover:bg-black dark:border-gray-900"
            onClick={() => onPause('PLAY')}
          >
            <PlayIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-green-500 " />
          </Ripples>
        );
      default:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-gray-300 mx-auto p-2 dark:hover:bg-black dark:border-gray-900"
            onClick={() => onPause('PAUSE')}
          >
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-green-500 " />
          </Ripples>
        );
    }
  };
  return (
    <div className="border-solid bg-white to-white border-2 border-gray-100 dark:border-gray-900 dark:bg-gray-900 text-gray-800 rounded-xl overflow-hidden flex flex-col justify-between">
      <div className=" flex flex-row justify-between p-5">
        <div className="rounded-full h-20 w-20">
          {loading ? (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r dark:from-gray-800 from-gray-200 to-gray-300 dark:to-gray-800 bg-gray-200 animate-pulse "></div>
          ) : (
            <Image
              alt="alt"
              className="rounded-full h-20 w-20"
              height="80"
              layout="fixed"
              src={image}
              width="80"
            />
          )}
        </div>
        {loading ? (
          <div className="w-3/4">
            <div className="w-full mt-2 h-4 rounded-full bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 from-gray-200 to-gray-300 bg-gray-200 animate-pulse "></div>
            <div className="w-20 mt-4 h-4 rounded-full bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 from-gray-200 to-gray-300 bg-gray-200 animate-pulse "></div>
          </div>
        ) : (
          <div className="flex flex-col w-full ">
            <Link href={`podcast/${item.slug}`}>
              <p
                className="col-start-5 mt-0 ml-4 text-lg hover:text-black cursor-pointer	text-left w-full mb-1 font-normal overflow-ellipsis overflow-hidden h-auto text-gray-700 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: title }}
              ></p>
            </Link>
            <span className="text-gray-400 dark:text-gray-500  ml-4 text-xs my-0">
              {item.meta.date_recorded
                ? `Recorded ${item.meta.date_recorded} /`
                : ''}
              {item.meta.filesize}
            </span>
          </div>
        )}
      </div>
      {loading ? (
        <div className="grid grid-cols-6 gap-3 p-5 pb-1 items-center w-full border-solid border-t-2 dark:border-black dark:border-t-1 border-gray-50 py-1 ">
          <div className="w-full mt-2 h-6 rounded-full bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 from-gray-200 to-gray-300 bg-gray-200 animate-pulse "></div>
          <div className="w-full mt-2 h-6 rounded-full bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 from-gray-200 to-gray-300 bg-gray-200 animate-pulse "></div>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-3 p-5 pb-1 items-center w-full border-solid border-t-2 dark:border-black dark:border-t-1 border-gray-50 py-1 ">
          {!playing ? (
            <Ripples
              className="rounded-full cursor-pointer hover:bg-gray-300 mx-auto p-2 dark:hover:bg-black dark:border-gray-900"
              onClick={() => onPlay(item)}
            >
              <PlayIcon
                className={`mt-0 h-6 w-6 fill-current dark:text-gray-300 text-gray-500 ${
                  playing ? 'text-green-500 dark:text-green-600' : ''
                } `}
              />
            </Ripples>
          ) : (
            PlayStatus(playerStatus)
          )}
          <Ripples
            className="rounded-full cursor-pointer hover:bg-gray-300 mx-auto p-2 dark:hover:bg-black dark:border-gray-900"
            onClick={() => onDownload(item)}
          >
            <DownloadOutline className="h-5 w-5 fill-current dark:text-gray-300 text-gray-500" />
          </Ripples>
          <span />
          <div className=" col-span-3 ">
            <div className="grid grid-cols-3 flex-row justify-end">
              <div
                className="flex flex-row justify-end relative"
                ref={containerRef}
              >
                <PopOver
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  container={containerRef.current}
                  onClose={() => {
                    setShowShare(!showShare);
                    handleClose();
                  }}
                  open={showShare}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <div
                    className={`relative bg-red-600 top-0  ${
                      showShare ? 'flex' : 'hidden'
                    } `}
                  >
                    <FacebookShareButton
                      hashtag="#zemachfm"
                      quote={` ${settings.share.shareTitle} ${item.title.rendered} `}
                      url={settings.social.facebook}
                    >
                      <FacebookIcon size="33" />
                    </FacebookShareButton>
                    <TwitterShareButton
                      hashtags={settings.share.hashtag}
                      related={settings.share.hashtag}
                      title={settings.share.shareTitle}
                      url={settings.social.twitter}
                    >
                      <TwitterIcon size="33" />
                    </TwitterShareButton>
                    <TelegramShareButton
                      title={settings.share.shareTitle}
                      url={settings.social.telegram}
                    >
                      <TelegramIcon size="33" />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      title={settings.share.shareTitle}
                      url={item.link}
                    >
                      <WhatsappIcon size="33" />
                    </WhatsappShareButton>
                  </div>
                </PopOver>
                <Ripples
                  className="rounded-full cursor-pointer mx-auto p-2 hover:bg-gray-300 dark:hover:bg-black dark:border-gray-900"
                  onClick={handleClick}
                >
                  <ShareIcon className="h-4 w-4 fill-current text-gray-400 dark:text-gray-600 " />
                </Ripples>
              </div>
              <div className="flex flex-row justify-end">
                <Ripples
                  className="rounded-full cursor-pointer mx-auto p-2  hover:bg-gray-300 dark:hover:bg-black dark:border-gray-900"
                  onClick={() => onPlatformClick(settings.platforms.spotify)}
                >
                  <Spotify className="h-4 w-4 fill-current text-gray-400 dark:text-gray-600 " />
                </Ripples>
              </div>
              <div className="flex flex-row justify-end">
                <Ripples
                  className="rounded-full cursor-pointer mx-auto p-2 hover:bg-gray-300 dark:hover:bg-black dark:border-gray-900"
                  onClick={() =>
                    onPlatformClick(settings.platforms.googlePodcast)
                  }
                >
                  <GooglePodcast className="h-4 w-4 fill-current text-gray-400 dark:text-gray-600 " />
                </Ripples>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeCard;
