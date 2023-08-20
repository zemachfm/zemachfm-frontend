import { ChangeEvent, FC, useEffect, useState } from 'react';
import Slider from '@bit/mui-org.material-ui.slider';
import tailwindDefaultConfig from 'tailwindcss/resolveConfig';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import { volumeSliderProps } from './index.d';
import customizedConfig from '../../tailwind.config';

const customizedTailwindConfig = tailwindDefaultConfig(customizedConfig);
const primaryColors = customizedTailwindConfig?.theme?.colors?.primary;
const primaryColor = primaryColors ? primaryColors['500'] : '#44b54c';
const primaryColorLight = primaryColors ? primaryColors['100'] : '#ddd';

const VolumeSlider:any = withStyles({
  rail: {
    opacity: 1,
    backgroundColor: primaryColorLight,
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
      style={{ width: 60, color: primaryColor, verticalAlign: 'bottom' }}
      value={sliderValue}
      valueLabelDisplay="auto"
      valueLabelFormat={() => `${sliderValue}%`}
    />
  );
};
export default PlayerSlide;
export { VolumeSlider };
