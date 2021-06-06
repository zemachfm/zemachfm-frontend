import { ReactElement, useEffect, useState } from 'react';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Popover from '@bit/mui-org.material-ui.popover';
import { useDispatch, useSelector } from 'react-redux';
import Moon from '../../icons/moon.svg';
import Sun from '../../icons/sun.svg';
import MenuIcon from '../../icons/menu.svg';
import { INavBarProps } from './index.d';
import LanguageIcon from '../../icons/globe.svg';
import { IHomeReducer, ThemeTypes } from '../../store/home/types.d';
import localStorageKeys from '../../lib/constants/localStorageKeys';
import { changeThemeAction, toogleMobileMenu } from '../../store/home/actions';
import { TRootReducer } from '../../store/reducer';

const LanguagePopover = withStyles({
  paper: {
    background: 'transparent',
  },
})(Popover);

const NavBar = (props: INavBarProps): ReactElement => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [langPopoverDisplay, setLangPopoverDisplay] = useState(false);
  const dispatch = useDispatch();
  const { theme }: IHomeReducer = useSelector(
    (root: TRootReducer) => root.home,
  );

  const toogleLangPopOver = () => setLangPopoverDisplay(!langPopoverDisplay);
  const { asPath } = useRouter();

  const onThemeChange = (themeSelected: ThemeTypes) => {
    localStorage.setItem(localStorageKeys.theme, themeSelected);
    dispatch(changeThemeAction(themeSelected));
  };

  const onDisplayMobileMenu = () => {
    dispatch(toogleMobileMenu());
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Remember theme option
    if (localStorageKeys.theme in localStorage) {
      const themeValue = localStorage.getItem(localStorageKeys.theme);
      if (themeValue === 'dark' || themeValue === 'light') {
        dispatch(changeThemeAction(themeValue));
      }
    }
  }, [dispatch]);

  return (
    <nav>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-white">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="block lg:hidden" onClick={onDisplayMobileMenu}>
              <MenuIcon />
            </button>
            <img
              alt="zemach-logo"
              className="p-0 h-12 w-auto  border-green-500 border-2 rounded-full lg:block hidden"
              src="/assets/zemach-small.png"
            />
            <Link href="/" passHref>
              <a>
                <h1 className="text-2xl ml-3 font-bold text-green-500 lg:block hidden">
                  {props.appName}
                </h1>
              </a>
            </Link>
          </div>
          <Link href="/" passHref>
            <a>
              <h1 className="text-2xl ml-3 font-bold text-yellow-400 lg:hidden block">
                {props.appName}
              </h1>
            </a>
          </Link>
          <div className="flex items-center justify-between">
            <button
              className="outline-none focus:outline-none dark:hover:bg-gray-800 hover:bg-gray-300 p-2 rounded-full"
              onClick={toogleLangPopOver}
              ref={setReferenceElement}
            >
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
                  <li className="my-4">
                    <Link href={asPath} locale="am">
                      <a
                        className={` ${
                          props.locale === 'am'
                            ? 'border-yellow-400 border-2 text-yellow-400'
                            : ''
                        } px-10 py-2 min-w-full`}
                      >
                        አማርኛ
                      </a>
                    </Link>
                  </li>
                  <li className="my-4">
                    <Link href={asPath} locale="en">
                      <a
                        className={` ${
                          props.locale === 'en'
                            ? 'border-yellow-400 border-2 text-yellow-400'
                            : ''
                        } px-10 py-2 min-w-full`}
                      >
                        English
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </LanguagePopover>

            <button
              className="ml-5 outline-none focus:outline-none dark:hover:bg-gray-800 hover:bg-gray-300 p-2 rounded-full"
              onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'light' ? <Moon /> : <Sun className="text-white" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
