import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { IToBannerProps } from './types.d';
import MorningIcon from '../../icons/morning.svg';
import Sunny from '../../icons/sunny.svg';
import NightIcon from '../../icons/night.svg';
import PlayIcon from '../../icons/play.svg';
import PauseIcon from '../../icons/pause.svg';
import { changePlayerStatus, playCertainAudio } from '../../store/home/actions';

const TopBanner = (props: IToBannerProps) => {
  const dispatch = useDispatch();
  const goodMorning = props.topBannerContent?.goodMorning || '';
  const goodAfternoon = props.topBannerContent?.goodAfternoon || '';
  const goodEvening = props.topBannerContent?.goodEvening || '';
  const MorningArtwork = (
    <Sunny className="lg:h-14 h-10 w-10 lg:w-14 mb-3 stroke-current fill-current text-white lg:block" />
  );

  const DayTimeArtwork = (
    <MorningIcon className="lg:h-14 w-14lg:h-14 h-10 w-10 lg:w-14 mb-3 fill-current text-white lg:block" />
  );

  const nightTimeArtWork = (
    <NightIcon className="lg:h-14 h-10 w-10 lg:w-14 mb-3 fill-current text-white lg:block" />
  );

  const [greetingItems, setGreetingItems] = useState<{
    greeting: string;
    artWork: ReactNode;
  }>({ greeting: goodMorning, artWork: DayTimeArtwork });

  const getAppropirateGreetinContent = (): {
    greeting: string;
    artWork: ReactNode;
  } => {
    const now = new Date();
    const currentHour = now.getHours();

    let greeting;
    let artWork;

    if (currentHour < 12) {
      greeting = goodMorning;
      artWork = MorningArtwork ;
    } else if (currentHour < 18) {
      greeting = goodAfternoon;
      artWork = DayTimeArtwork;
    } else {
      greeting = goodEvening;
      artWork = nightTimeArtWork;
    }

    return {
      artWork,
      greeting,
    };
  };

  const onPlayBannerEpisode = () => {
    dispatch(playCertainAudio((props.recentEpisode as unknown) as string));
  };

  const onPlayingStateAction = (type: string) => {
    dispatch(changePlayerStatus({ type }));
  };

  useEffect(() => {
    const currentTimeGreeting = getAppropirateGreetinContent();
    setGreetingItems(currentTimeGreeting);
  }, [props.topBannerContent]);

  const getPlayingBasedButtonProps = (): {
    onClick?: () => void;
    icon: ReactNode;
    text: string;
  } => {
    switch (props.playerStatus) {
      case 0:
        return {
          text: props.topBannerContent?.pause,
          icon: (
            <PauseIcon className=" rounded-full fill-current  dark:text-green-300 text-green-500 w-10 h-10 p-2 " />
          ),
        };
      case 1:
        return {
          text: props.topBannerContent?.pause,
          icon: (
            <PauseIcon className=" rounded-full fill-current  dark:text-green-300 text-green-500 w-10 h-10 p-2 " />
          ),
          onClick: () => onPlayingStateAction('PAUSE'),
        };
      case 2:
        return {
          text: props.topBannerContent?.play,
          icon: (
            <PlayIcon className=" rounded-full fill-current  dark:text-green-300 text-green-500 w-10 h-10 p-2 " />
          ),
          onClick: () => onPlayingStateAction('PLAY'),
        };
      default:
        return {
          text: props.topBannerContent?.pause,
          icon: (
            <PauseIcon className=" rounded-full fill-current  dark:text-gray-100 text-gray-700 w-10 h-10 p-2 " />
          ),
          onClick: () => onPlayingStateAction('PAUSE'),
        };
    }
  };

  const playingBasedProps = getPlayingBasedButtonProps();

  return props.recentEpisode ? (
    <div
      className="rounded-2xl px-0 mx-0 border-0 bg-blurry "
      style={{
        backgroundImage: `url(${props.recentEpisode.small_player})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="w-full overflow-hidden flex mt-4 rounded-xl bg-opacity-90 dark:bg-opacity-90 flex-col-reverse lg:flex-row py-14 p-7 justify-self-end bg-gray-200 dark:bg-gray-800 bg-transparent top-3"
        style={{
          backdropFilter: 'blur(23px)',
        }}
      >
        <div className="flex h-full">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex flex-row items-end">
                <h2 className="text-4xl mr-4 xl:items-center items-start  mb-4 block font-bold lg:text-left text-black dark:text-white w-4/4">
                  {greetingItems.greeting}
                  <br />
                </h2>
                {greetingItems.artWork}
              </div>
              <img
                className="w-full h-auto rounded-2xl block lg:hidden mb-8 "
                src={props.recentEpisode?.big_player}
              />
              <Link href={`/podcast/${props.recentEpisode?.slug}`}>
                <h3 className="lg:text-3xl text-xl font-bold text-gray-900 dark:text-gray-100 w-4/4 self-start">
                  {props.recentEpisode?.title?.rendered}
                </h3>
              </Link>
              <div
                className="text-gray-700 dark:text-gray-400 w-full line-clamp-3 lg:line-clamp-none lg:w-4/5 mt-3 text-justify self-start"
                dangerouslySetInnerHTML={{
                  __html: props.recentEpisode?.excerpt?.rendered,
                }}
              />
            </div>

            {props.currentPlay?.id !== props.recentEpisode?.id ? (
              <button
                className="bg-white  flex lg:w-48 justify-center items-center hover:bg-gray-100 px-4 mt-6 py-2 dark:bg-gray-900 dark:text-gray-100 text-gray-700 rounded-lg font-bold text-lg"
                onClick={onPlayBannerEpisode}
              >
                <PlayIcon className=" rounded-full fill-current  dark:text-gray-100 text-gray-700 w-10 h-10 p-2 " />
                {props.topBannerContent?.play}
              </button>
            ) : (
              <button
                className=" bg-white focus:outline-none outline-none flex lg:w-48 justify-center items-center hover:bg-gray-100 px-4 mt-6 py-2 dark:bg-gray-900 dark:text-gray-100 text-gray-700 rounded-lg font-bold text-lg"
                onClick={playingBasedProps.onClick}
              >
                {playingBasedProps.icon}
                {playingBasedProps.text}
              </button>
            )}
          </div>
        </div>
        <div className="hidden lg:flex flex-row items-center w-3/6">
          <img
            className=" h-auto w-full z-10 rounded-2xl lg:block border-1 flex flex-row items-center border-gray-100"
            src={props.recentEpisode?.big_player}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default TopBanner;
