import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import './scrollToTop.css';

const ScrollToTop = (): React.JSX.Element => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // changing the showTopBtn state whenever a scroll event happens
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="top-to-btm">
      {showTopBtn && (
        <FontAwesomeIcon
          className="icon-position icon-style"
          icon={faAngleUp}
          onClick={goToTop}
        />
      )}
    </div>
  );
};

export default ScrollToTop;
