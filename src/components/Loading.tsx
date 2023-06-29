/**
 * Loading Component
 * Loading indicator during data fetching.
 */

import React from "react";

const loadingGif = require("../assets/loading.gif");

function Loading() {
  return (
    <div className="flex flex-col items-center">
      <img alt="loading..." style={{ width: 128 }} src={String(loadingGif)} />
      <small className="mt-4">Fetching tail-wagging data...</small>
    </div>
  );
}

export default Loading;
