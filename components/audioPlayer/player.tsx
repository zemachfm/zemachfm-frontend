import React from 'react';
import Slider from '@bit/mui-org.material-ui.slider';
import Ripples from 'react-ripples';
import * as Props from './index.d';
import ForwardIcon from '../../icons/skip-forward-outline.svg';
import BackwardIcon from '../../icons/skip-back-outline.svg';
import VolumeIcon from '../../icons/volume-up-outline.svg';
import ShuffleIcon from '../../icons/shuffle-outline.svg';
import PlayIcon2 from '../../icons/play.svg';
import Pause from '../../icons/pause.svg';

const PlayerComponent: React.FC<Props.audioPlayerComponent> = ({
  isPlaying,
  duration,
  onPlayerChange,
  currentPlay,
  progressing,
  playerSettings,
  bufferedSize,
}) => {
  const [sliderValue, setSliderValue] = React.useState<number>(duration);

  const onSlide = (e, value: number) => {
    setSliderValue(value);
  };
  return (
    <div className="grid grid-cols-9 justify-around gap-4 ">
      <div></div>
      <div className="flex  flex-row items-end row w-full py-2 px-4">
        <img className="rounded w-16" src={currentPlay.small_player} />
        <div className="ml-2 flex flex-col justify-between h-100">
          <h3
            className=" text-left mt-3 mx-1 text-gray-600 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: currentPlay.title.rendered }}
          ></h3>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-4 ">
        <Ripples
          className="rounded-full border  hover:bg-gray-300  border-gray-300 dark:border-gray-900"
          onClick={() => onPlayerChange('BACKWARD')}
        >
          <BackwardIcon
            className="w-8 h-8 p-1 rounded-full "
            style={{ fill: '#8a8686' }}
          />
        </Ripples>
        {progressing ? 'progressing' : ''}
        {isPlaying ? (
          <Ripples
            className="rounded-full hover:bg-gray-300 border border-gray-300 dark:border-gray-900 shadow "
            onClick={() => onPlayerChange('PAUSE')}
          >
            <Pause
              className=" p-0 rounded-full w-12 h-12 p-2 "
              style={{ fill: '#8a8686' }}
            />
          </Ripples>
        ) : (
          <Ripples
            className="rounded-full border hover:bg-gray-300  border-gray-300 dark:border-gray-900 shadow "
            onClick={() => onPlayerChange('PLAY')}
          >
            <PlayIcon2
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#8a8686' }}
            />
          </Ripples>
        )}

        <Ripples className="rounded-full border hover:bg-gray-300  border-gray-300 dark:border-gray-900 ">
          <ForwardIcon
            className="w-8 h-8 p-1 rounded-full "
            style={{ fill: '#8a8686' }}
          />
        </Ripples>
      </div>
      <div className="flex row justify-between col-span-5 items-center ">
        <div className="flex flex-row w-full items-center">
          <span className="text-sm text-gray-400 mr-2 ">
            {' '}
            {duration} {bufferedSize}{' '}
          </span>
          <div className="w-full relative">
            <Slider
              className="relative z-10"
              style={{ color: '#44b54c' }}
              getAriaValueText={() => `${duration} value`}
              id="player"
              max={3000}
              onChange={onSlide}
              value={sliderValue}
              valueLabelDisplay="auto"
            />
            <Slider
              styles={{ thumb: { padding: 0, margin: 0, width: 0 } }}
              className="absolute left-0 text-yellow-400"
              style={{ position: 'absolute', color: '#acf9b1' }}
              id="player"
              max={3000}
              onChange={onSlide}
              value={bufferedSize}
              valueLabelDisplay={false}
            />
          </div>
          <span className="text-sm text-gray-400 ml-2 ">24:23</span>{' '}
        </div>
        <div className="w-28 ml-4 flex felx-row justify-around items-center ">
          <ShuffleIcon
            className="w-6 mr-2"
            style={{ fill: playerSettings.shuffle ? '#68f721' : '#8a8686' }}
          />
          <span className="text-xs text-gray-500 mr-2 align-baseline">
            {`${playerSettings.volume * 100}% `}
          </span>
          <VolumeIcon className="w-6 mr-2" style={{ fill: '#8a8686' }} />
        </div>
      </div>
      <div> </div>
    </div>
  );
};
export default PlayerComponent;
