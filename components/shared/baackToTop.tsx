import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IHomeReducer } from '../../store/home/types.d';
import { TRootReducer } from '../../store/reducer';
import ChecvronUpIcon from '../../icons/chevron-up.svg';

const BackToTop = () => {
  const [showScroll, setShowScroll] = React.useState(false);
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const { currentPlay } = state.player;
  const checkScrollToTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScrollToTop);
  }

  return showScroll ? (
    <button
      className={`fixed bottom-3 ${
        currentPlay.item ? 'mb-40 lg:mb-28' : 'mb-10'
      } lg:mr-8 mr-2 right-3 focus:outline-none outline-none lg:p-4 p-3 rounded-full dark:bg-gray-700 bg-white shadow-xl z-10`}
      onClick={scrollTop}
    >
      <ChecvronUpIcon className="text-black dark:text-white" />
    </button>
  ) : null;
};

export default BackToTop;
