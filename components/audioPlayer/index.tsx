import React from 'react';
import PauseIcon from '../../icons/pause-circle-outline.svg';
import ForwardIcon from '../../icons/arrow-ios-forward-outline.svg';
import BackwardIcon from '../../icons/arrow-ios-back-outline.svg';

const AudioPlayer: React.FC = () => (
  <div className=" fixed dark:bg-gray-900 shadow-sm h-full w-12/12 px-4 mx-4 rounded-xl">
    <div className="flex flex-col justify-between h-auto relative w-full align-middle">
      <div className="grid col-2 w-full">
        <img
          className="rounded-xl"
          src="https://zemachfm.com/wp-content/uploads/2021/02/wechat-tiktok-.png"
        />
        <h3 className="text-3xl text-left mt-3 mx-1 dark:text-gray-200 ">
          advertisment or st
        </h3>
        <p className="text-left mt-5 dark:text-gray-200 ">
          we want to move the player down there, so we are not missing anyting
        </p>
        <p className="text-left mt-5 dark:text-gray-200 ">
          what do you think ?
        </p>
        <div className="flex flex-row">
          <button className="px-4 rounded mt-4  py-2 bg-gray-200">
            Go there
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AudioPlayer;
