import Link from 'next/link';
import React from 'react';
import { translatedStrings } from '../types/index.d';

interface Props {
  content: translatedStrings;
}

const NotFound = ({ content }: Props) => (
  <div className="h-full w-ful dark:bg-black flex flex-col justify-center items-center">
    <h1 className="text-8xl dark:text-white font-bold">
      {content?.notFoundPage?.mainTitle}
    </h1>
    <p className="text-2xl dark:text-white">
      {content?.notFoundPage?.subtitle}
    </p>
    <p className="text-sm w-96 text-center mt-2 mb-5 text-gray-600 dark:text-gray-200">
      {content?.notFoundPage?.description}
    </p>

    <a
      className="bg-gray-300 dark:bg-gray-800 dark:text-white rounded-md px-16 py-3"
      href="/"
    >
      {content?.notFoundPage?.goHome}
    </a>
  </div>
);

export default NotFound;
