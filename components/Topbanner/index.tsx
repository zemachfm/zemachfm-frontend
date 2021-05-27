import { ReactNode } from 'react';
import { IToBannerProps } from './types.d';
import MorningIcon from '../../icons/morning.svg';
import NightIcon from '../../icons/night.svg';
import PlayIcon from '../../icons/play.svg';

const TopBanner = (props: IToBannerProps) => {
  const getAppropirateGreetinContent = (): {
    greeting: string;
    artWork: ReactNode;
  } => {
    const now = new Date();
    const currentHour = now.getTime();
    const goodMorning = props.topBannerContent?.goodMorning || '';
    const goodAfternoon = props.topBannerContent?.goodAfternoon || '';
    const goodEvening = props.topBannerContent?.goodEvening || '';

    let greeting;
    let artWork;

    if (currentHour < 12) {
      greeting = goodMorning;
      artWork = (
        <MorningIcon className="w-36 h-36 text-white hidden lg:block" />
      );
    } else if (currentHour < 18) {
      greeting = goodAfternoon;
      artWork = (
        <MorningIcon className="w-36 h-36 text-white hidden lg:block" />
      );
    } else {
      greeting = goodEvening;
      artWork = <NightIcon className="w-36 h-36 text-white hidden lg:block" />;
    }

    return {
      artWork,
      greeting,
    };
  };

  const greeetingContents = getAppropirateGreetinContent();

  return props.recentEpisode ? (
    <div className="w-full flex mt-4 flex-col-reverse lg:flex-row py-14 p-7 justify-self-end bg-gradient-to-b lg:bg-gradient-to-r  dark:from-yellow-600 dark:to-green-600 from-yellow-500 to-green-500 bg-transparent rounded-xl top-3">
      <div className="flex h-full">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-center lg:items-start">
            {greeetingContents.artWork}
            <h2 className="text-6xl  mb-8 block font-bold lg:text-left text-white w-4/4">
              {greeetingContents.greeting}
              <br />
            </h2>
            <img
              className="w-72 h-72 rounded-2xl block lg:hidden mb-8 border-8 border-green-300"
              src={props.recentEpisode?.episode_player_image}
            />
            <h3 className="text-3xl font-bold text-white w-4/4 self-start">
              {props.recentEpisode?.title?.rendered}
            </h3>
            <div
              className="text-gray-100 w-full line-clamp-3 lg:line-clamp-none lg:w-4/5 mt-3 text-justify self-start"
              dangerouslySetInnerHTML={{
                __html: props.recentEpisode?.excerpt?.rendered,
              }}
            />
          </div>
          <button className="bg-white  flex lg:w-48 justify-center items-center hover:bg-gray-100 px-4 mt-6 py-2 dark:bg-gray-900 dark:text-gray-100 text-gray-700 rounded-lg font-bold text-lg">
            <PlayIcon className=" rounded-full fill-current  dark:text-gray-100 text-gray-700 w-10 h-10 p-2 " />
            {props.topBannerContent?.play}
          </button>
        </div>
      </div>
      <img
        className="w-80 h-80 rounded-2xl hidden lg:block border-8 border-green-300"
        src={props.recentEpisode?.episode_player_image}
      />
    </div>
  ) : null;
};

export default TopBanner;
