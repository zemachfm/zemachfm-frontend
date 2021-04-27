import { FC, useState } from 'react';
import props from './index.d';

const Guests: FC<props> = ({ title }) => {
  const [key, setKey] = useState<number>(2);
  return (
    <div>
      <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
        {title}{' '}
      </h1>
      <p className="text-gray-400 text-lg mb-7"> our gurests we have interved so far </p>

      <div className="grid grid-cols-3 gap-4 ">
        <div className="rounded-lg p-3 border bg-gradient-to-t from-red-100 to-yellow-100 border-gray-300 ">
          <img
            className="rounded-xl w-6/6"
            src="https://zemachfm.com/wp-content/uploads/2021/01/Yohana-Episode-Greener.png"
          />
          <div className="p-3 rounded-lg">
            <h1 className=" text-4xl font-bold mb-3 "> Yohana Ermias </h1>
            <p> digitiazind epei jkdj sdifjsoeje </p>
            <div className="flex flex-row justify-start">
              <button className="py-2 px-4 mt-4 rounded outline-none bg-red-500 text-white">
                PLay Now
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg p-3 border bg-gradient-to-t from-blue-100 to-yellow-100 border-gray-300 ">
          <img
            className="rounded-xl w-6/6"
            src="https://zemachfm.com/wp-content/uploads/2020/12/betelhem-dessie.png"
          />
          <div className="p-3 rounded-lg">
            <h1 className=" text-4xl font-bold mb-3 "> Yohana Ermias </h1>
            <p> digitiazind epei jkdj sdifjsoeje </p>
            <div className="flex flex-row justify-start">
              <button className="py-2 px-4 mt-4 rounded outline-none bg-blue-500 text-white">
                PLay Now
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg p-3 border bg-gradient-to-t from-green-100 to-yellow-100 border-gray-300 ">
          <img
            className="rounded-xl w-6/6"
            src="https://zemachfm.com/wp-content/uploads/2021/02/Nathan-Damtew-Zemach.png"
          />
          <div className="p-3 rounded-lg">
            <h1 className=" text-4xl font-bold mb-3 "> Yohana Ermias </h1>
            <p> digitiazind epei jkdj sdifjsoeje </p>
            <div className="flex flex-row justify-start">
              <button className="py-2 px-4 mt-4 rounded outline-none bg-green-500 text-white">
                PLay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guests;
