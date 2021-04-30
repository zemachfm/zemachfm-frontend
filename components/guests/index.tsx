import { FC, useState } from 'react';
import GuestCard from './host';
import props from './index.d';

const Guests: FC<props> = ({ title, episodes, subTitle }) => {
  const [key, setKey] = useState<number>(2);
  return (
    <div>
      <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
        {title}
      </h1>
      <p className="text-gray-400 text-lg mb-7">{subTitle}</p>

      <div className="grid grid-cols-4 gap-6 ">
        {episodes
          ? episodes.map(episode => <GuestCard item={episode} />)
          : null}
      </div>
    </div>
  );
};

export default Guests;
