import React from 'react';
import episodeCardInterface from './index.d';
import PlayIcon from '../../icons/play-circle-outline.svg';
import ShareIcon from '../../icons/share-outline.svg';
import Spotify from '../../icons/spotify.svg';
import GooglePodcast from '../../icons/google-podcasts.svg';
import DownloadOutline from '../../icons/cloud-download-outline.svg';

const EpisodeCard: React.FC<episodeCardInterface> = ({
  title,
  image,
  onPlay,
  item,
}) => (
  <div className="border-solid bg-white to-white border-2 border-gray-100 dark:border-gray-900 dark:bg-gray-900 text-gray-800 rounded-xl overflow-hidden flex flex-col justify-between">
    <div className=" flex flex-row justify-between p-5">
      <img className=" rounded-full h-20 w-20" src={image} />
      <p
        className="col-start-5 mt-0 ml-4 text-lg	text-left w-full mb-4 font-normal overflow-ellipsis overflow-hidden h-20 text-gray-700 dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: title }}
      ></p>
    </div>

    <div className="grid grid-cols-6 gap-3 p-5 pb-3 pt-0 items-center w-full border-solid border-t-2 dark:border-gray-800 border-gray-50 pt-4 ">
      <PlayIcon
        className="mt-0 h-6 w-6 fill-current dark:text-gray-300 text-gray-500 "
        onClick={() =>onPlay(item)}
      />
      <DownloadOutline className="h-5 w-5 fill-current dark:text-gray-300 text-gray-500" />
      <span />
      <div className=" col-span-3 ">
        <div className="grid grid-cols-3 flex-row justify-end">
          <div className="flex flex-row justify-end">
            <ShareIcon className="h-4 w-4 fill-current text-gray-400 dark:text-gray-600 " />
          </div>
          <div className="flex flex-row justify-end">
            <Spotify className="h-4 w-4 fill-current text-gray-400 dark:text-gray-600 " />
          </div>
          <div className="flex flex-row justify-end">
            <GooglePodcast className="h-4 w-4 fill-current text-gray-400 dark:text-gray-600 " />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EpisodeCard;
