import { ReactElement } from 'react';
import PauseIcon from '../../icons/pause-circle-outline.svg';
import ForwardIcon from '../../icons/arrow-ios-forward-outline.svg';
import BackwardIcon from '../../icons/arrow-ios-back-outline.svg';

function AudioPlayer(): ReactElement {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 shadow-sm h-full w-12/12 px-4 rounded-xl">
      <div className="flex flex-col justify-between h-3/4 w-full align-middle">
        <div className="grid col-2 w-full">
          <h3 className="text-2xl text-center my-10 dark:text-gray-200 ">
            {' '}
            the title playing
          </h3>
          <img
            className="rounded-xl"
            src="https://zemachfm.com/wp-content/uploads/2021/02/wechat-tiktok-.png"
          />
          <p className="text-center mt-5 dark:text-gray-200 ">
            {' '}
            the title playing
          </p>
        </div>

        <div>
          <div className="px-6">
            <div className="border-gray-100  border-t-2 border-solid" />
          </div>

          <div className="grid mt-1 grid-cols-3 gap-4 w-full align-middle justify-between pt-5 ">
            <div className="flex flex-row justify-center">
              <BackwardIcon className="h-10 w-10 fill-current text-center text-gray-400 dark:text-gray-600 " />
            </div>

            <div className="flex flex-row justify-center">
              <PauseIcon className="h-10 w-10 fill-current text-gray-400 dark:text-gray-600 " />
            </div>
            <div className="flex flex-row justify-center">
              <ForwardIcon className="h-10 w-10 fill-current text-gray-400 dark:text-gray-600 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
