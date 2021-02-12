import episodeCardInterface from './index.d';
import PlayIcon from '../../icons/play-circle.svg';
import ShareIcon from '../../icons/share-outline.svg';
import Spotify from '../../icons/spotify.svg';
import GooglePodcast from '../../icons/google-podcasts.svg';

function EpisodeCard({ title, subtitle, image }: episodeCardInterface) {
  return (
    <div className="border-solid bg-white to-white bg-white border-2 border-gray-100 dark:border-gray-900 dark:bg-gray-800 text-gray-800 rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="p-5">
        <img className=" w-full rounded-lg" src={image} />
        <p
          className="col-start-5 mt-4 text-lg	text-left text- mb-4 font-normal overflow-ellipsis text-gray-700 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 pb-3 pt-0 items-center w-full">
        <PlayIcon className="mt-0 h-8 w-8 fill-current text-gray-500 " />
        <div className=" col-span-2 ">
          <div className="grid grid-cols-4 flex flex-row justify-end">
            <span />
            <div className="flex flex-row justify-end">
              <ShareIcon className="h-5 w-5 fill-current text-gray-400" />
            </div>
            <div className="flex flex-row justify-end">
              <Spotify className="h-5 w-5 fill-current text-gray-400" />
            </div>
            <div className="flex flex-row justify-end">
              <GooglePodcast className="h-5 w-5 fill-current text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeCard;
