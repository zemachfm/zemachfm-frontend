import { ChangeEvent, FC, useEffect, useState } from 'react';
import Slider from '@bit/mui-org.material-ui.slider';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import { volumeSliderProps } from './index.d';

const VolumeSlider = withStyles({
  rail: {
    opacity: 0.1,
    backgroundColor: '#ddd',
  },
})(Slider);

const PlayerSlide: FC<volumeSliderProps> = ({ volume, onVolumeChange }) => {
  const [sliderValue, setSliderValue] = useState<number>(volume);
  const [isOnSlide, setIsOnSlide] = useState<boolean>(false);
  useEffect(() => {
    setSliderValue(volume * 100);
  }, [isOnSlide, volume]);

  const onSlide = (_e, value: number) => {
    setIsOnSlide(true);
    setSliderValue(value);
  };

  const onChangeCommited = (_e: ChangeEvent, val: number) => {
    onVolumeChange({
      value: val / 100 ? val / 100 : 0,
      name: 'volume',
    });
  };

  return (
    <VolumeSlider
      max={100}
      min={0}
      onChange={onSlide}
      onChangeCommitted={onChangeCommited}
      style={{ width: 60, color: '#44b54c', verticalAlign: 'bottom' }}
      value={sliderValue}
      valueLabelDisplay="auto"
      valueLabelFormat={() => `${sliderValue}%`}
    />
  );
};
export default PlayerSlide;
export { VolumeSlider };
