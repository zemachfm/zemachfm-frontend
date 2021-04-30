import { FC } from 'react';
import Ripples from 'react-ripples';
import { hostProps } from './index.d';
import PlayIcon from '../../icons/play.svg';
import PlusIcon from '../../icons/plus-circle-outline.svg';

const GuestCard: FC<hostProps> = ({ item }) => (
  <div className="rounded-lg relative overflow-hidden  bg-whtite ">
    <img className="w-full" src={item.episode_player_image} />
    <div
      className="absolute bg-opacity-50 bg-green-200 bottom-0 w-full"
      style={{ backdropFilter: 'blur(7px)' }}
    >
      <div className="px-4 py-2">
        <Ripples className=" rounded-full p-2 ">
          <PlayIcon
            className=" rounded-full  w-6 h-6 "
            style={{ fill: '#fff' }}
          />
        </Ripples>
        <Ripples className="rounded-full mx-4 p-2">
          <PlusIcon
            className=" rounded-full w-6 h-6  "
            style={{ fill: '#fff' }}
          />
        </Ripples>
      </div>
    </div>
  </div>
);
export default GuestCard;
