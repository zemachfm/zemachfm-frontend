/* eslint-disable import/group-exports */
/* eslint-disable @typescript-eslint/no-unused-vars */
// utils/mdxUtils.ts
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

type Items = {
  [key: string]: string;
};

type Post = {
  data: {
    [key: string]: string;
  };
  content: string;
};

const POSTS_PATH = join(process.cwd(), '_posts');

function getPostFilePaths(): string[] {
  return (
    fs
      .readdirSync(POSTS_PATH)
      // Only include md(x) files
      .filter(path => /\.mdx?$/.test(path))
  );
}

// eslint-disable-next-line import/group-exports
export function getPost(slug: string, isWorks: boolean): Post {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const readingMinutes = readingTime(content).minutes?.toFixed(0);

  return { data: { ...data, readingMinutes }, content };
}

// eslint-disable-next-line import/group-exports
export function getPostItems(
  filePath: string,
  fields: string[] = [],
  isWorks = false,
): Items {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { data, content } = getPost(slug, isWorks);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(
  fields: string[] = [],
): {
  posts: Items[];
} {
  const filePaths = getPostFilePaths();
  const posts = filePaths
    .map(filePath => getPostItems(filePath, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return { posts };
}
