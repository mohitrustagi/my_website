/**
 * https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */

import { useState, useEffect } from 'react';
const QUERY = '(prefers-reduced-motion: no-preference)';

// Start as `false` on both the server and the first client render so hydration
// always matches (the animated branches render nothing until mounted). The real
// preference is applied right after mount.
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setPrefersReducedMotion(!mediaQueryList.matches);
    const listener = event => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []);
  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
