"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressBar = () => {
  return (
    <ProgressBar
      height="3px"
      color="#617f90"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default NProgressBar;
