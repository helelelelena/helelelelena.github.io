const STOP_WORDS = new Set([
  'about',
  'after',
  'again',
  'among',
  'around',
  'because',
  'before',
  'being',
  'between',
  'could',
  'every',
  'first',
  'from',
  'have',
  'into',
  'just',
  'like',
  'many',
  'more',
  'most',
  'over',
  'should',
  'some',
  'than',
  'that',
  'their',
  'there',
  'these',
  'they',
  'this',
  'those',
  'through',
  'under',
  'very',
  'what',
  'when',
  'where',
  'which',
  'while',
  'with',
  'your'
]);

export const thoughtPieces = [
  {
    slug: 'weather-notebook',
    type: 'internal',
    title: 'Weather Notebook',
    sourceText:
      'I kept a weather notebook while walking to class, noticing rhythm, pressure, and a kind of atmospheric drift—cloud texture, faint gradients, small shifts in temperature that felt like they moved through me.',
    body: [
      'I started carrying a small notebook for weather notes during my morning walk, mostly to catch what was already fading.',
      'At first I wrote temperature and wind direction, but slowly it became about pattern, transition, and the quiet weight of the air.',
      'Some mornings felt identical on paper but different in my body, like a subtle shift in pressure or light.',
      'Forecasting stopped feeling distant and became something closer, almost a form of listening.'
    ]
  },
  {
    slug: 'quiet-equations',
    type: 'internal',
    title: 'Quiet Equations',
    sourceText:
      'Some equations feel loud, but others stay quiet—holding structure beneath the surface, revealing themselves slowly, almost reluctantly, each time you return.',
    body: [
      'I am drawn to equations that do not resolve immediately, that hold something back.',
      'Returning after a few days, a line feels different, as if something has shifted—not the equation, maybe just me.',
      'Understanding arrives unevenly, in fragments, like a slow drift rather than a clear step.',
      'There is a kind of stillness in not knowing yet.'
    ]
  },
  {
    slug: 'field-notes-on-light',
    type: 'internal',
    title: 'Field Notes on Light',
    sourceText:
      'Light near dusk reshapes the city for a moment—soft reflections, shifting angles, surfaces catching and releasing glow before everything settles back.',
    body: [
      'My camera made me notice light as something temporary, almost weightless.',
      'Glass, leaves, and concrete scatter it into brief patterns across sidewalks.',
      'These moments feel like they exist on the edge of disappearing.',
      'I try to write quickly, but what remains is only a trace.'
    ]
  },
  {
    slug: 'learning-to-listen',
    type: 'internal',
    title: 'Learning to Listen',
    sourceText:
      'Listening is slower than speaking; in that delay, something opens—a space where meaning gathers if you do not interrupt it too soon.',
    body: [
      'I used to prepare too many questions, filling every silence.',
      'Now I leave more space, letting things linger a little longer.',
      'Uncertainty is easier to notice when you are not trying to resolve it immediately.',
      'The best questions feel like openings, not conclusions.'
    ]
  },
  {
    slug: 'placeholder-essay-atmosphere',
    type: 'external',
    title: 'Atmosphere and Memory',
    url: 'https://example.com/writing/atmosphere-and-memory',
    sourceText:
      'Atmosphere holds memory in quiet ways—after rain, in the air’s softness, in distant sounds, in the slow fading of light at dusk.'
  },
  {
    slug: 'placeholder-essay-systems',
    type: 'external',
    title: 'Small Systems',
    url: 'https://example.com/writing/small-systems',
    sourceText:
      'Small systems reveal themselves slowly; patterns emerge through repetition, through drift and return, until the structure becomes visible.'
  },
  {
    slug: 'placeholder-essay-maps',
    type: 'external',
    title: 'Unfinished Maps',
    url: 'https://example.com/writing/unfinished-maps',
    sourceText:
      'Maps feel like promises, but unfinished ones hold something softer—an openness, a boundary not yet fixed, a space still becoming.'
  },
  {
    slug: 'placeholder-essay-noise',
    type: 'external',
    title: 'Noise Floor',
    url: 'https://example.com/writing/noise-floor',
    sourceText:
      'There is always a layer beneath what we notice—a kind of quiet noise, where meaning lingers before it fully appears.'
  }
];

function extractWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !STOP_WORDS.has(word));
}

export function buildFloatingWords(limit = 90) {
  const words = [];

  thoughtPieces.forEach((piece, pieceIndex) => {
    const pool = extractWords(`${piece.title} ${piece.sourceText}`);

    pool.forEach((word, wordIndex) => {
      words.push({
        id: `${piece.slug}-${wordIndex}-${word}`,
        label: word,
        slug: piece.slug,
        href: piece.type === 'external' ? piece.url : `/thoughts/${piece.slug}`,
        external: piece.type === 'external',
        openMode: piece.type === 'external' ? 'new-tab' : 'post-it',
        pieceType: piece.type,
        title: piece.title,
        sourceText: piece.sourceText,
        body: piece.body,
        seed: pieceIndex * 100 + wordIndex
      });
    });
  });

  return words.slice(0, limit);
}
