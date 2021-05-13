import { FC } from 'react';
import footerProps from './types.d';

const Footer: FC<footerProps> = ({ content, playing }) => (
  <div className="my-4 flex flex-col col-span-7 dark:bg-black">
    <footer
      className={`py-5 my-5  margin-auto ${
        playing ? 'mb-28' : ''
      } dark:bg-black`}
    >
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3">
          <img
            alt="yoknow"
            className=" w-20 h-20"
            height="80"
            src="/assets/zemach-small.png"
            width="80"
          />
        </div>
        <div>
          <h3 className="mb-4 text-2xl"> {content.appName} </h3>
          <p className="text-gray-500">{content.footer.subtitle}</p>
        </div>
        <ul>
          <h3 className="mb-4 text-2xl"> {content.footer.recentEpisodes} </h3>

          <li className="text-gray-500">hi there</li>
          <li className="text-gray-500">hi there</li>
          <li className="text-gray-500">hi there</li>
        </ul>
        <ul>
          {' '}
          <h3 className="mb-4 text-2xl"> {content.footer.platforms} </h3>
          <li className="text-gray-500">hi there</li>
          <li className="text-gray-500">hi there</li>
          <li className="text-gray-500">hi there</li>
        </ul>
        <div className="col-span-3">
          <div className="mt-4 text-gray-400"> {content.footer.copyright} </div>
        </div>
      </div>
    </footer>
  </div>
);
export default Footer;
