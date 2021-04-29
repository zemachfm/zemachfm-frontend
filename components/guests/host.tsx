import PlayIcon from '../../icons/play.svg';

const GuestCard = () => (
  <div className="rounded-lg overflow-hidden grid grid-cols-6 bg-whtite dark:bg-gray-900 ">
    <img
      className=" w-6/6 rounded-2xl col-span-3"
      src="https://zemachfm.com/wp-content/uploads/2020/12/betelhem-dessie.png"
    />
    <div className="p-3 col-span-3  rounded-lg flex flex-col justify-between">
      <div className="header">
        <h1 className=" text-2xl font-bold mb-1 mt-0 text-gray-800 dark:text-white"> Yohana Ermias </h1>
        <p className="text-gray-500 dark:text-gray-200"> digitiazind epei jkdj sdifjsoeje enen litay bila </p>
      </div>
      <div className="flex flex-row justify-start">
        <button className="py-2 pr-4 flex flex-row items-center justify-start text-green-500 mt-4 rounded outline-none text-gray-900">
          <PlayIcon
            className=" rounded-full w-9 h-9 p-2 "
            style={{ fill: '#13c979' }}
          /> Play Now
        </button>
      </div>
    </div>
  </div>
);
export default GuestCard;
