import { FC, useEffect, useState } from 'react';
import Slider from '@bit/mui-org.material-ui.slider';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import { sliderProps } from './index.d';

const BufferedSlider = withStyles({
  thumb: {
    padding: 0,
    height: 0,
    width: 0,
  },
  rail: {
    opacity: 0.1,
    backgroundColor: '#ddd',
  },
})(Slider);

const MainSlider = withStyles({
  rail: {
    opacity: 0.1,
    backgroundColor: '#ddd',
  },
})(Slider);

const PlayerSlide: FC<sliderProps> = ({
  bufferedPercent,
  playedPercent,
  currentTime,
  duration,
  onSeek,
  theme,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(playedPercent);
  const [currentTimeCalc, setCurrentTimeCalc] = useState<string>(currentTime);
  const [isOnSlide, setIsOnSlide] = useState<boolean>(false);
  useEffect(() => {
    if (!isOnSlide) {
      setSliderValue(playedPercent);
      setCurrentTimeCalc(currentTime);
    }
  }, [playedPercent, currentTime]);

  const onSlide = (_e, value: number) => {
    const seekedTime = (duration * value) / 100;
    const s = seekedTime % 60;
    const m = (seekedTime / 60) % 60;
    setSliderValue(value);
    setCurrentTimeCalc(`${m.toFixed(0)}:${s.toFixed(0)}`);
    setIsOnSlide(true);
  };

  const onChangeCommited = (_e, value) => {
    // eslint-disable-next-line no-console
    setIsOnSlide(false);
    onSeek(value);
  };
  return (
    <div className="w-full relative">
      <MainSlider
        aria-labelledby="non-linear-slider"
        className="relative z-10"
        getAriaValueText={() => `${currentTimeCalc}`}
        id="player"
        max={100}
        onChange={onSlide}
        onChangeCommitted={onChangeCommited}
        step={0.1}
        style={{ color: '#44b54c' }}
        value={sliderValue}
        valueLabelDisplay="auto"
        valueLabelFormat={() => `${currentTimeCalc}`}
      />
      <BufferedSlider
        className="absolute left-0 text-yellow-400"
        id="player"
        max={100}
        onChange={onSlide}
        style={{
          position: 'absolute',
          color: theme === 'light' ? '#acf9b1' : '#9bc59e',
        }}
        value={bufferedPercent}
        valueLabelDisplay="off"
      />
    </div>
  );
};
export default PlayerSlide;
