import React, { Component, useEffect, useLayoutEffect } from "react";

type ScrollHandlerProps = {
  keepScrollOnRefresh: boolean;
};

const ScrollHandler: React.FC<ScrollHandlerProps> = ({ children }) => {
  const setScrollPosition = () => {
    localStorage.setItem("ScrollPosition", window.pageYOffset.toString());
  };

  const getScrollPosition = () => {
    const stringPos = localStorage.getItem("ScrollPosition");
    if (stringPos == null) {
      return 0;
    }
    const parsed = parseInt(stringPos, 10);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: getScrollPosition(), left: 0, behavior: "auto" });
    window.addEventListener("scroll", setScrollPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", setScrollPosition);
    };
  });

  return <div>{children}</div>;
};

export default ScrollHandler;
