import { FC } from 'react';
import Ripples from 'react-ripples';
import { hostProps } from './index.d';
import PlayIcon from '../../icons/play.svg';
import PlusIcon from '../../icons/plus-circle-outline.svg';
import PauseIcon from '../../icons/pause.svg';

const GuestCard: FC<hostProps> = ({
  item,
  playing,
  playerStatus,
  onPause,
  onPlay,
}) => {
  const PlayStatus = type => {
    switch (type) {
      case 0:
        return (
          <Ripples className="rounded-full animate-pulse hover:bg-green-600 mx-auto bg-green-500 p-2 dark:hover:bg-green-700 dark:bg-green-600 ">
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-green-500 " />
          </Ripples>
        );
      case 1:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-green-600 mx-auto bg-green-500 p-2 dark:hover:bg-green-700 dark:bg-green-600 "
            onClick={() => onPause('PAUSE')}
          >
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-white " />
          </Ripples>
        );
      case 2:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-green-600 bg-green-500 mx-auto p-2 dark:hover:bg-green-700 dark:bg-green-600 "
            onClick={() => onPause('PLAY')}
          >
            <PlayIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-white " />
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
    <div className="rounded-lg relative overflow-hidden  bg-whtite ">
      <img className="w-full" src={item.episode_player_image} />
      <div
        className="absolute bg-opacity-10 bg-gray-200 bottom-0 w-full"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="px-4 py-2 bg-opacity-20 bg-gray-900">
          {playing ? (
            PlayStatus(playerStatus)
          ) : (
            <Ripples
              className=" rounded-full p-1 cursor-pointer"
              onClick={() => onPlay(item)}
            >
              <PlayIcon
                className=" rounded-full  w-6 h-6 "
                style={{ fill: '#fff' }}
              />
            </Ripples>
          )}
          <Ripples className="rounded-full mx-5 p-1 cursor-pointer">
            <PlusIcon
              className=" rounded-full w-6 h-6  "
              style={{ fill: '#fff' }}
            />
          </Ripples>
        </div>
      </div>
    </div>
  );
};
export default GuestCard;
