import { ReactElement, useState } from 'react';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import Link from 'next/link';
import Popover from '@bit/mui-org.material-ui.popover';
import Moon from '../../icons/moon.svg';
import Sun from '../../icons/sun.svg';
import MenuIcon from '../../icons/menu.svg';
import { INavBarProps } from './index.d';
import LanguageIcon from '../../icons/globe.svg';

const LanguagePopover = withStyles({
  paper: {
    background: 'transparent',
  },
})(Popover);

const NavBar = (props: INavBarProps): ReactElement => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [langPopoverDisplay, setLangPopoverDisplay] = useState(false);

  const toogleLangPopOver = () => setLangPopoverDisplay(!langPopoverDisplay);

  return (
    <nav>
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 dark:text-white">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              className="block lg:hidden"
              onClick={props.toogleMobileMenu}
            >
              <MenuIcon />
            </button>
            <img
              alt="zemach-logo"
              className="p-0 h-12 w-auto  border-yellow-400 border-2 rounded-full lg:block hidden"
              src="/assets/zemach-small.png"
            />
            <h1 className="text-2xl ml-3 font-bold text-yellow-400 lg:block hidden">
              {props.appName}
            </h1>
          </div>
          <h1 className="text-2xl ml-3 font-bold text-yellow-400 lg:hidden block">
            {props.appName}
          </h1>
          <div className="flex items-center justify-between">
            <button onClick={toogleLangPopOver} ref={setReferenceElement}>
              <LanguageIcon className="dark:text-white" />
            </button>

            <LanguagePopover
              anchorEl={referenceElement}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              onClose={toogleLangPopOver}
              open={langPopoverDisplay}
            >
              <div className="p-5  border-solid bg-white shadow-md border-gray-100 dark:bg-gray-800 text-gray-800 rounded-xl dark:text-white z-10">
                <ul>
                  <li className="w-full">
                    <Link href="/" locale="am">
                      <a
                        className={` ${
                          props.locale === 'am'
                            ? 'border-yellow-400 border-2 text-yellow-400'
                            : ''
                        } px-10 py-2 min-w-full`}
                        type="button"
                      >
                        አማርኛ
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/" locale="en">
                      <a
                        className={` ${
                          props.locale === 'en'
                            ? 'border-yellow-400 border-2 text-yellow-400'
                            : ''
                        } px-10 py-2`}
                        type="button"
                      >
                        English
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </LanguagePopover>

            <button
              className="ml-5"
              onClick={() =>
                props.onChangeTheme(props.theme === 'dark' ? 'light' : 'dark')
              }
            >
              {props.theme === 'light' ? (
                <Moon />
              ) : (
                <Sun className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
