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
          <Ripples className="rounded-full animate-pulse hover:bg-primary-600 mx-auto bg-primary-500 p-2 dark:hover:bg-primary-700 dark:bg-primary-600 ">
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-primary-500 " />
          </Ripples>
        );
      case 1:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-primary-600 mx-auto bg-primary-500 p-2 dark:hover:bg-primary-700 dark:bg-primary-600 "
            onClick={() => onPause('PAUSE')}
          >
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-white " />
          </Ripples>
        );
      case 2:
        return (
          <Ripples
            className="rounded-full cursor-pointer hover:bg-primary-600 bg-primary-500 mx-auto p-2 dark:hover:bg-primary-700 dark:bg-primary-600 "
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
            <PauseIcon className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-primary-500 " />
          </Ripples>
        );
    }
  };

  return (
    <div className="rounded-lg bg-white relative overflow-hidden  ">
      <img className="w-full" src={item.big_player} />
      <div
        className="absolute  right-0 bottom-0 w-full"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="px-4 py-2">
          {playing ? (
            PlayStatus(playerStatus)
          ) : (
            <Ripples
              className=" rounded-full p-1 cursor-pointer text-white"
              onClick={() => onPlay(item)}
            >
              <PlayIcon className=" rounded-full fill-current text-white w-6 h-6 " />
            </Ripples>
          )}
        </div>
      </div>
    </div>
  );
};
export default GuestCard;
