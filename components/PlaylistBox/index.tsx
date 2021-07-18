import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IToBannerProps } from './types.d';
import ArrowUpward from '../../icons/chevron-up.svg';
import PlayIcon from '../../icons/play.svg';
import PauseIcon from '../../icons/pause.svg';
import { changePlayerStatus, playCertainAudio } from '../../store/home/actions';

const PlaylistBox = (props: IToBannerProps) => {
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState<boolean>(true);
  const onPlayBannerEpisode = () => {
    dispatch(playCertainAudio((props.recentEpisode as unknown) as string));
  };

  const onPlayingStateAction = (type: string) => {
    dispatch(changePlayerStatus({ type }));
  };

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
      className="rounded-2xl bg-blurry "
      style={{
        backgroundImage: `url(${props.recentEpisode.small_player})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="w-full  flex mt-4 rounded-xl bg-opacity-90 dark:bg-opacity-90 flex-col-reverse lg:flex-row py-14 p-7 justify-self-end bg-gray-200 dark:bg-gray-800 bg-transparent top-3"
        style={{
          backdropFilter: 'blur(23px)',
        }}
      >
        <div className="flex h-full">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-center lg:items-start">
              <div className="grid grid-cols-4 justify-between">
                <div className="lg:col-span-3 col-span-4 ">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h2 className="text-2xl lg:text-4xl mr-4 items-center  mb-4 block font-bold lg:text-left text-black dark:text-white w-4/4">
                        {props.currentPlay?.id !== props.recentEpisode?.id
                          ? props?.topBannerContent?.recent
                          : props?.topBannerContent?.nowPlaying}
                      </h2>
                      <img
                        className=" lg:hidden h-auto w-full mb-4 float-right z-10 rounded-2xl border-1 flex flex-row items-center border-gray-100"
                        src={props.recentEpisode?.big_player}
                      />
                      <h3
                        className="text-lg lg:text-2xl cursor-pointer mt-6 font-bold text-gray-900 dark:text-gray-100 w-4/4 self-start"
                        onClick={() => setCollapse(!collapse)}
                      >
                        {props.recentEpisode?.title?.rendered}
                        <ArrowUpward
                          className={`transform inline-block ml-3  transition-all ${
                            collapse ? 'rotate-180' : ''
                          }`}
                        />
                      </h3>
                      <div className="flex lg:hidden"></div>
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
                <div className="hidden lg:flex flex-row items-end lg:col-span-1 col-span-4 mt-6 lg:mt-0 w-full">
                  <img
                    className=" h-auto w-full float-right z-10 rounded-2xl lg:block border-1 flex flex-row items-center border-gray-100"
                    src={props.recentEpisode?.big_player}
                  />
                </div>
              </div>
              {!collapse ? (
                <div
                  className="text-gray-700 playlist-content dark:text-gray-400 w-full  lg:line-clamp-none lg:w-4/5 mt-3 text-justify self-start"
                  dangerouslySetInnerHTML={{
                    __html: props.recentEpisode?.content?.rendered,
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PlaylistBox;
