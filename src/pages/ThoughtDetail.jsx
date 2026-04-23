import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { thoughtPieces } from '../data/thoughtsData';
import './ThoughtDetail.css';

function ThoughtDetail() {
  const { slug } = useParams();

  const thought = useMemo(
    () => thoughtPieces.find(piece => piece.slug === slug),
    [slug]
  );

  if (!thought) {
    return (
      <section className="thought-detail-page">
        <h1>not found</h1>
        <p>that thought does not exist yet.</p>
        <Link to="/thoughts" className="thought-back-link">
          back to thoughts
        </Link>
      </section>
    );
  }

  if (thought.type === 'external') {
    return (
      <section className="thought-detail-page">
        <h1>{thought.title}</h1>
        <p>this writing currently lives outside the site.</p>
        <a
          href={thought.url}
          target="_blank"
          rel="noreferrer noopener"
          className="thought-back-link"
        >
          open external writing
        </a>
      </section>
    );
  }

  return (
    <article className="thought-detail-page">
      <h1>{thought.title}</h1>
      {thought.body.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <Link to="/thoughts" className="thought-back-link">
        back to thoughts
      </Link>
    </article>
  );
}

export default ThoughtDetail;
