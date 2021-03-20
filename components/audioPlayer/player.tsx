import React, { ReactElement } from 'react';
import Slider from '@bit/mui-org.material-ui.slider';
import ForwardIcon from '../../icons/arrow-ios-forward-outline.svg';
import BackwardIcon from '../../icons/arrow-ios-back-outline.svg';
import VolumeIcon from '../../icons/volume-up-outline.svg';
import ShuffleIcon from '../../icons/shuffle-outline.svg';
import PlayIcon from '../../icons/play_arrow-black-48dp.svg';

function PlayerComponent(): ReactElement {
  return (
    <div className="grid grid-cols-9 justify-around gap-4 ">
      <div></div>
      <div className="flex  flex-row items-end row w-full py-2 px-4">
        <img
          className="rounded w-14"
          src="https://zemachfm.com/wp-content/uploads/2021/02/wechat-tiktok-.png"
        />
        <div className="ml-2 flex flex-col justify-between h-100">
          <h3 className=" text-left mt-3 mx-1 text-gray-600 dark:text-gray-200 text-xl">
            advertisment
          </h3>
          <p className="text-xs text-gray-400">the subtitel </p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-4 ">
        <BackwardIcon
          className="w-8 h-8 p-1 rounded-full bg-gray-50"
          style={{ fill: '#8a8686' }}
        />
        <PlayIcon className=" p-0 rounded-full " style={{ fill: '#8a8686' }} />
        <ForwardIcon
          className="w-8 h-8 p-1 rounded-full bg-gray-50"
          style={{ fill: '#8a8686' }}
        />
      </div>
      <div className="flex row justify-between col-span-5 items-center ">
        <div className="flex flex-row w-full items-center">
          <span className="text-sm text-gray-400 mr-2 ">2:23</span>
          <Slider value={44} />
          <span className="text-sm text-gray-400 ml-2 ">24:23</span>{' '}
        </div>
        <div className="w-28 ml-4 flex felx-row justify-around">
          <ShuffleIcon className="w-6 mr-2" style={{ fill: '#8a8686' }} />
          <VolumeIcon className="w-6 mr-2" style={{ fill: '#8a8686' }} />
        </div>
      </div>
      <div> </div>
    </div>
  );
}
export default PlayerComponent;
