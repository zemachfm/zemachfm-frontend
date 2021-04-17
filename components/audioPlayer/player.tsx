import React from 'react';
import Ripples from 'react-ripples';
import * as Props from './index.d';
import ForwardIcon from '../../icons/skip-forward-outline.svg';
import BackwardIcon from '../../icons/skip-back-outline.svg';
import VolumeIcon from '../../icons/volume-up-outline.svg';
import ShuffleIcon from '../../icons/shuffle-outline.svg';
import PlayIcon from '../../icons/play.svg';
import Pause from '../../icons/pause.svg';
import PlayerSlide from './slider';

const PlayerComponent: React.FC<Props.audioPlayerComponent> = ({
  isPlaying,
  duration,
  durationCalcuated,
  currentTime,
  percentagePlayed,
  onPlayerChange,
  currentPlay,
  progressing,
  playerSettings,
  bufferedSize,
  proceedWithPlayer,
  onSeek,
}) => (
  <div className="grid lg:grid-cols-12 md:grid-cols-4 sm:grid-cols-4 justify-center align-middle gap-4 ">
    <div className="col-span-4 grid grid-cols-3">
      <div className="flex flex-row items-end row w-full py-2 lg:col-start-2 md:col-start-1 px-4">
        <img className="rounded w-16" src={currentPlay.small_player} />
        <div className="ml-2 flex flex-col justify-between h-100">
          <h3
            className="text-sm text-left block line-clamp-3 mt-3 mx-1 -marquee text-gray-600 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: currentPlay.title.rendered }}
          ></h3>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-4 ">
        <Ripples
          className="rounded-full border  hover:bg-gray-300 dark:hover:bg-gray-900 border-gray-300 dark:border-gray-900"
          onClick={() => proceedWithPlayer(1)}
        >
          <BackwardIcon
            className="w-8 h-8 p-1 rounded-full "
            style={{ fill: '#8a8686' }}
          />
        </Ripples>
        {isPlaying ? (
          <Ripples
            className={`rounded-full hover:bg-gray-300 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-900 shadow ${
              progressing ? 'animate-pulse' : ''
            } `}
            onClick={() => onPlayerChange('PAUSE')}
          >
            <Pause
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#8a8686' }}
            />
          </Ripples>
        ) : (
          <Ripples
            className={`rounded-full hover:bg-gray-300 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-900 shadow ${
              progressing ? 'animate-pulse' : ''
            } `}
            onClick={() => onPlayerChange('PLAY')}
          >
            <PlayIcon
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#8a8686' }}
            />
          </Ripples>
        )}

        <Ripples
          className="rounded-full border hover:bg-gray-300 dark:hover:bg-gray-900 border-gray-300 dark:border-gray-900 "
          onClick={() => proceedWithPlayer(0)}
        >
          <ForwardIcon
            className="w-8 h-8 p-1 rounded-full "
            style={{ fill: '#8a8686' }}
          />
        </Ripples>
      </div>
    </div>
    <div className="lg:col-span-8 md:col-span-8 grid grid-cols-7">
      <div className="flex row justify-between col-span-5 md:col-span-6 items-center ">
        <div className="flex flex-row w-full items-center">
          <span className="text-sm text-gray-400 mr-2 ">{currentTime}</span>
          <PlayerSlide
            bufferedPercent={bufferedSize}
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            playedPercent={percentagePlayed}
          />
          <span className="text-sm text-gray-400 ml-2 ">
            {durationCalcuated}
          </span>
        </div>
        <div className="w-28 ml-4 flex felx-row justify-around items-center ">
          <Ripples className="rounded-full hover:bg-gray-300  dark:border-gray-900 ">
            <ShuffleIcon
              className="w-6 m-2"
              style={{ fill: playerSettings.shuffle ? '#1f2937' : '#8a8686' }}
            />
          </Ripples>
          <Ripples className="rounded-full hover:bg-gray-300  dark:border-gray-900 ">
            <VolumeIcon className="w-6 m-2" style={{ fill: '#8a8686' }} />
          </Ripples>
        </div>
      </div>
    </div>
  </div>
);
export default PlayerComponent;
