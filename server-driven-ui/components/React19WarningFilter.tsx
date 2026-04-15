"use client";

import { useEffect } from "react";

const REACT_19_CRAFT_WARNING = "Accessing element.ref was removed in React 19";

export function React19WarningFilter() {
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes(REACT_19_CRAFT_WARNING)
      ) {
        return;
      }

      originalError(...args);
    };

    console.warn = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes(REACT_19_CRAFT_WARNING)
      ) {
        return;
      }

      originalWarn(...args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
