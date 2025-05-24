/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center gap-4 p-4 flex-wrap justify-center">
      <img
        className="w-20 h-20 animate-spin"
        src="https://www.svgrepo.com/show/199956/loading-loader.svg"
        alt="Loading icon"
      />
    </div>
  );
};

export default Loading;
