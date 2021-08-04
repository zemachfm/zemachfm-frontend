// components/Thumbnail.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const Featured: React.FC<Props> = ({ title, src, slug }: Props) => {
  const image = (
    <div className="w-full h-80 mx-auto bg-transparent relative ">
      <img alt={`Cover Image for ${title}`} className="rounded-xl" src={src} />
    </div>
  );
  return (
    <>
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </>
  );
};

export default Featured;
