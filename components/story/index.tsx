import { FC } from 'react';
import Face from '../../icons/smiling-face-outline.svg';

const OurStory: FC<Record<string, null>> = () => (
  <div id="our-story">
    <h1 className=" text-6xl font-bold mt-8 mb-4 ">Our stroy</h1>
    <p className="text-gray-600 ">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <div className="grid grid-cols-4 gap-4 mt-10">
      <div className="bg-green-400 p-4 text-left transition-all duration-100 hover:shadow-xl text-white rounded-lg">
        <div className="text-3xl border-b border-gray-100 pb-3 mb-4 text-left font-bold">
          Mission
          <span className=" float-right ">
            <Face
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#fff' }}
            />
          </span>
        </div>
        <p>so this might not go as well as we thogut</p>
      </div>

      <div className="bg-yellow-500 p-4 text-left transition-all duration-100 hover:shadow-xl text-white rounded-lg">
        <div className="text-3xl border-b border-gray-100 pb-3 mb-4 text-left font-bold">
          Vission
          <span className=" float-right ">
            <Face
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#fff' }}
            />
          </span>
        </div>
        <p>so this might not go as well as we thogut</p>
      </div>
      <div className="bg-red-400 p-4 text-left transition-all duration-100 hover:shadow-xl text-white rounded-lg">
        <div className="text-3xl border-b border-gray-100 pb-3 mb-4 text-left font-bold">
          Mission
          <span className=" float-right ">
            <Face
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#fff' }}
            />
          </span>
        </div>
        <p>so this might not go as well as we thogut</p>
      </div>
      <div className="bg-blue-500 p-4 text-left transition-all duration-100 hover:shadow-xl text-white rounded-lg">
        <div className="text-3xl border-b border-gray-100 pb-3 mb-4 text-left font-bold">
          Mission
          <span className=" float-right ">
            <Face
              className=" rounded-full w-12 h-12 p-2 "
              style={{ fill: '#fff' }}
            />
          </span>
        </div>
        <p>so this might not go as well as we thogut</p>
      </div>
    </div>
  </div>
);
export default OurStory;
