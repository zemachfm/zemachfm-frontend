import { useState } from 'react';
import Link from 'next/link';
import { usePopper } from 'react-popper';
import Moon from '../../icons/moon.svg';
import Sun from '../../icons/sun.svg';
import LanguageIcon from '../../icons/globe.svg';
import { INavBarProps } from './index.d';

const NavBar = (props: INavBarProps) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [langPopoverDisplay, setLangPopoverDisplay] = useState(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const toogleLangPopOver = () => setLangPopoverDisplay(!langPopoverDisplay);

  return (
    <nav className="">
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              alt="zemach-logo"
              className="p-0 h-12 w-auto  border-green-400 border-2 rounded-full"
              src="/assets/zemach-small.png"
            />
            <h1 className="text-2xl ml-3 font-bold text-green-500">
              {props.appName}
            </h1>
          </div>

          <div className="flex items-center w-1/12 justify-between">
            <button onClick={toogleLangPopOver} ref={setReferenceElement}>
              <LanguageIcon className="dark:text-white" />
            </button>

            {langPopoverDisplay ? (
              <div
                className="p-5  border-solid bg-white shadow-md border-gray-100 dark:bg-gray-800 text-gray-800 rounded-xl dark:text-white"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                <ul>
                  <li className="w-full">
                    <Link href="/" locale="am">
                      <a
                        className={` ${
                          props.locale === 'am'
                            ? 'bg-yellow-100 dark:text-black'
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
                            ? 'bg-yellow-100 dark:text-black'
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
            ) : null}

            <button
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
