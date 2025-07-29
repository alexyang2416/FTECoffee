import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const reviewsDir = path.join(process.cwd(), 'reviews');

export function getAllReviews() {
  const filenames = fs.readdirSync(reviewsDir);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(reviewsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      rating: data.rating,
      roaster: data.roaster,
      brewMethod: data.brewMethod,
    };
  });
}
