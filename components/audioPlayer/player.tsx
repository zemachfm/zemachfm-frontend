import React from 'react';
import Ripples from 'react-ripples';
import * as Props from './index.d';
import ForwardIcon from '../../icons/skip-forward-outline.svg';
import BackwardIcon from '../../icons/skip-back-outline.svg';
import VolumeIcon from '../../icons/volume-up-outline.svg';
import VolumeOffIcon from '../../icons/volume-off-outline.svg';
import ArrowUpward from '../../icons/arrow-ios-upward-outline.svg';
import PlayIcon from '../../icons/play.svg';
import Pause from '../../icons/pause.svg';
import PlayerSlide from './slider';
import VolumeSlider from './audioSlider';

const PlayerComponent: React.FC<Props.audioPlayerComponent> = ({
  isPlaying,
  duration,
  durationCalcuated,
  currentTime,
  percentagePlayed,
  onPlayerChange,
  onSettingChange,
  currentPlay,
  progressing,
  playerSettings,
  bufferedSize,
  proceedWithPlayer,
  onSeek,
  theme,
}) => {
  const [mobileMoreMenu, setMobileMoreMenu] = React.useState<boolean>(false);
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-4 sm:grid-cols-4 justify-center align-middle lg:gap-4  ">
      <div className="col-span-4 grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 order-2 lg:order-1">
        <div className="flex flex-row items-end row w-full py-2 lg:col-start-2 col-start-1 lg:px-4  ">
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
            className="rounded-full border cursor-pointer	  hover:bg-gray-300 dark:hover:bg-gray-900 border-gray-300 dark:border-gray-900"
            onClick={() => proceedWithPlayer(1)}
          >
            <BackwardIcon
              className="w-8 h-8 p-1 rounded-full "
              style={{ fill: '#8a8686' }}
            />
          </Ripples>
          {isPlaying ? (
            <Ripples
              className={`rounded-full cursor-pointer	 hover:bg-gray-300 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-900 shadow ${
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
              className={`rounded-full cursor-pointer	 hover:bg-gray-300 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-900 shadow ${
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
            className="rounded-full border cursor-pointer	 hover:bg-gray-300 dark:hover:bg-gray-900 border-gray-300 dark:border-gray-900 "
            onClick={() => proceedWithPlayer(0)}
          >
            <ForwardIcon
              className="w-8 h-8 p-1 rounded-full "
              style={{ fill: '#8a8686' }}
            />
          </Ripples>
        </div>
      </div>
      <div className="md:col-span-8 grid grid-cols-7 col-span-4 order-1 lg:order-2">
        <div className="grid grid-cols-12 justify-between col-span-7 lg:grid-span-5 md:col-span-6 items-center px-4 lg:px-0 ">
          <div className="flex flex-row w-full  items-center lg:col-span-8 col-span-12 order-2 lg:order-1 ">
            <div className=" lg:hidden">
              <Ripples
                className="rounded-full bloc cursor-pointer mr-2	"
                onClick={() => {
                  setMobileMoreMenu(!mobileMoreMenu);
                }}
              >
                <ArrowUpward
                  className={`w-10 h-10 p-1 rounded-full transition ease-in duration-200 ${
                    mobileMoreMenu ? 'transform rotate-180 ' : ''
                  } `}
                  style={{ fill: '#8a8686' }}
                />
              </Ripples>
            </div>
            <span className="text-sm text-gray-400 mr-2 ">{currentTime}</span>
            <PlayerSlide
              bufferedPercent={bufferedSize}
              currentTime={currentTime}
              duration={duration}
              onSeek={onSeek}
              playedPercent={percentagePlayed}
              theme={theme}
            />
            <span className="text-sm text-gray-400 ml-2 ">
              {durationCalcuated}
            </span>
          </div>
          <div
            className={`w-full lg:w-30 ${
              mobileMoreMenu ? 'flex' : 'hidden'
            } ml-4 lg:flex felx-row items-center justify-around lg:col-span-3 col-span-12 order-1 lg:order-2 `}
          >
            <select
              className="px-2 py-1 bg-opacity-50 cursor-pointer	 dark:bg-opacity-80 bg-transparent w-15 rounded-md outline-none text-gray-500 focus:border-green-600 focus:border-1 mr-2"
              onChange={event => {
                if (event.target.value) {
                  onSettingChange({
                    value: parseFloat(event.target.value),
                    name: 'rate',
                  });
                }
              }}
            >
              <option selected={playerSettings.rate === 0.5}> 0.5x </option>
              <option selected={playerSettings.rate === 0.75}> 0.75x </option>
              <option selected={playerSettings.rate === 1}> 1x </option>
              <option selected={playerSettings.rate === 1.25}> 1.25x </option>
              <option selected={playerSettings.rate === 1.5}> 1.5x </option>
              <option selected={playerSettings.rate === 2}> 2x</option>
              <option selected={playerSettings.rate === 2.5}> 2.5x </option>
            </select>

            <Ripples
              className="rounded-full cursor-pointer ml-6	lg:ml-0 border hover:bg-gray-300 dark:hover:bg-gray-900 z-50 border-gray-300 dark:border-gray-900 mr-2 "
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const me =
                  playerSettings.volume > 0
                    ? onSettingChange({
                        value: 0,
                        name: 'volume',
                      })
                    : onSettingChange({
                        value: 1,
                        name: 'volume',
                      });
              }}
            >
              {playerSettings.volume === 0 ? (
                <VolumeOffIcon
                  className="w-5 m-2"
                  style={{ fill: '#8a8686' }}
                />
              ) : (
                <VolumeIcon className="w-5 m-2" style={{ fill: '#8a8686' }} />
              )}
            </Ripples>
            <VolumeSlider
              onVolumeChange={onSettingChange}
              volume={playerSettings.volume}
            ></VolumeSlider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerComponent;
