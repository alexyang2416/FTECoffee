import { getAllReviews } from '../lib/reviews';
import Graph from '../components/Graph';

export default function Home({ reviews }) {
  const graphData = [...reviews]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r) => ({
      date: new Date(r.date).toLocaleDateString(),
      rating: r.rating,
    }));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Coffee Ratings</h1>

      <Graph data={graphData} />

      <h2 className="text-xl font-semibold mt-10 mb-4">All Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.slug} className="border p-4 rounded">
            <h3 className="font-bold">{r.title}</h3>
            <p>{r.roaster} – {r.brewMethod}</p>
            <p>Rating: {r.rating}/10</p>
            <p className="text-sm text-gray-500">{r.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const reviews = getAllReviews();
  return {
    props: { reviews },
  };
}
