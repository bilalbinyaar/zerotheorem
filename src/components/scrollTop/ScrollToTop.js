import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const prevPathnameRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top only if the pathname has changed.
    if (prevPathnameRef.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;