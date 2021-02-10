import Moon from '../../icons/moon.svg';
import Sun from '../../icons/sun.svg';
import { INavBarProps } from './types';

const NavBar = (props: INavBarProps) => (
  <nav className="">
    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex justify-between items-center h-16">
        <div className="flex items-center">
          <img
            alt="zemach-logo"
            className="p-0 h-12 w-auto  border-green-400 border-2 rounded-full"
            src="/assets/zemach-small.png"
          />
          <h1 className="text-2xl ml-3 font-bold text-green-500">Zemach</h1>
        </div>
        <button
          onClick={() =>
            props.onChangeTheme(props.theme === 'dark' ? 'light' : 'dark')
          }
        >
          {props.theme === 'light' ? <Moon /> : <Sun className="text-white" />}
        </button>
      </div>
    </div>
  </nav>
);

export default NavBar;
