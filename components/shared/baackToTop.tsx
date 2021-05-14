import React, { useEffect } from 'react';
import ChecvronUpIcon from '../../icons/chevron-up.svg';

const BackToTop = () => {
  const [showScroll, setShowScroll] = React.useState(false);

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
      className="fixed bottom-3 right-3 p-5 rounded-full bg-green-500 shadow-md z-10"
      onClick={scrollTop}
    >
      <ChecvronUpIcon className="text-white" />
    </button>
  ) : null;
};

export default BackToTop;
