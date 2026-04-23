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
      'I kept a weather notebook while walking to class and started noticing rhythm, pressure, cloud texture, and tiny shifts in temperature that changed my mood.',
    body: [
      'I started carrying a small notebook for weather notes during my morning walk.',
      'At first I only wrote temperature and wind direction, but over time I focused on pattern and transition.',
      'Writing these small observations made forecasting feel less abstract and more personal.'
    ]
  },
  {
    slug: 'quiet-equations',
    type: 'internal',
    title: 'Quiet Equations',
    sourceText:
      'Some equations feel loud and performative, but others are quiet and patient; they reveal structure slowly when you revisit them on different days.',
    body: [
      'I like equations that do not reveal everything immediately.',
      'Returning to the same proof after a week often changes how I interpret each line.',
      'The pace of understanding can be part of the beauty.'
    ]
  },
  {
    slug: 'field-notes-on-light',
    type: 'internal',
    title: 'Field Notes on Light',
    sourceText:
      'Light near sunset has a strange geometry in city streets, bouncing off glass, concrete, and leaves to create short moments that disappear almost instantly.',
    body: [
      'My camera taught me to look at light as an event rather than a constant.',
      'Cloud edges and reflective windows can create temporary maps across sidewalks.',
      'I write quickly in these moments because the scene changes in seconds.'
    ]
  },
  {
    slug: 'learning-to-listen',
    type: 'internal',
    title: 'Learning to Listen',
    sourceText:
      'Research meetings taught me that listening is a technical skill, not just a social one, because good questions depend on attention and restraint.',
    body: [
      'I used to prepare too many questions before meetings.',
      'Now I write fewer prompts and spend more effort on listening for uncertainty.',
      'The best follow-up question is usually the one that opens a path, not the one that closes a debate.'
    ]
  },
  {
    slug: 'placeholder-essay-atmosphere',
    type: 'external',
    title: 'Atmosphere and Memory',
    url: 'https://example.com/writing/atmosphere-and-memory',
    sourceText:
      'Atmosphere can hold memory in subtle ways: smell after rain, distant traffic, cold railings, and the changing color of the sky at dusk.',
    body: []
  },
  {
    slug: 'placeholder-essay-systems',
    type: 'external',
    title: 'Small Systems',
    url: 'https://example.com/writing/small-systems',
    sourceText:
      'Small systems are easier to understand when you watch them long enough, especially when feedback loops become visible in ordinary routines.',
    body: []
  },
  {
    slug: 'placeholder-essay-maps',
    type: 'external',
    title: 'Unfinished Maps',
    url: 'https://example.com/writing/unfinished-maps',
    sourceText:
      'Maps are promises as much as they are tools, and unfinished maps remind us that certainty is always temporary.',
    body: []
  },
  {
    slug: 'placeholder-essay-noise',
    type: 'external',
    title: 'Noise Floor',
    url: 'https://example.com/writing/noise-floor',
    sourceText:
      'I keep thinking about the noise floor in data and conversation, and how much meaning hides below what we first notice.',
    body: []
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
