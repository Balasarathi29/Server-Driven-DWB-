"use client";

import { useEffect, useState } from "react";

export type Viewport = "mobile" | "tablet" | "desktop";

interface ViewportBreakpoints {
  mobile: number; // < 640px
  tablet: number; // 640px - 1024px
  desktop: number; // >= 1024px
}

const DEFAULT_BREAKPOINTS: ViewportBreakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1024,
};

/**
 * Hook to detect current viewport/device type
 * Returns the current viewport and a helper to get responsive props
 */
export const useResponsiveViewport = (breakpoints = DEFAULT_BREAKPOINTS) => {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < breakpoints.mobile) {
        setViewport("mobile");
      } else if (width < breakpoints.tablet) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };

    // Call once on mount
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  // Helper to get responsive values
  const getResponsive = <T>(mobileVal: T, tabletVal: T, desktopVal: T): T => {
    if (!isMounted) return desktopVal;

    switch (viewport) {
      case "mobile":
        return mobileVal;
      case "tablet":
        return tabletVal;
      case "desktop":
        return desktopVal;
    }
  };

  return {
    viewport,
    windowWidth,
    isMounted,
    getResponsive,
    isMobile: viewport === "mobile",
    isTablet: viewport === "tablet",
    isDesktop: viewport === "desktop",
  };
};

/**
 * Hook to get responsive CSS Grid columns
 */
export const useResponsiveGrid = (
  mobileCol = 1,
  tabletCol = 2,
  desktopCol = 3,
) => {
  const { getResponsive } = useResponsiveViewport();

  return {
    columns: getResponsive(mobileCol, tabletCol, desktopCol),
    gridClassName: getResponsive(
      `grid-cols-${mobileCol}`,
      `grid-cols-${tabletCol}`,
      `grid-cols-${desktopCol}`,
    ),
  };
};

/**
 * Hook to get responsive font size
 */
export const useResponsiveFontSize = (
  mobile = "14px",
  tablet = "16px",
  desktop = "18px",
) => {
  const { getResponsive } = useResponsiveViewport();
  return getResponsive(mobile, tablet, desktop);
};

/**
 * Hook to get responsive spacing
 */
export const useResponsiveSpacing = (
  mobile = "8px",
  tablet = "12px",
  desktop = "16px",
) => {
  const { getResponsive } = useResponsiveViewport();
  return getResponsive(mobile, tablet, desktop);
};
