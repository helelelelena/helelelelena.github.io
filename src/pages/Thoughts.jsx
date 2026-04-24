import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { buildFloatingWords } from '../data/thoughtsData';
import './Thoughts.css';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }

      if (cell.length > 0 || row.length > 0) {
        row.push(cell.trim());
        rows.push(row);
      }

      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const CSV_ONLY_MIN_LINES = 20;
const WORD_COLLISION_SCALE_BUFFER = 1.12;

function getPostItSize(note) {
  const bodyText = note?.body?.[0] && note.body[0] !== note.sourceText ? note.body[0] : '';
  const totalLength = `${note?.title || ''} ${note?.sourceText || ''} ${bodyText}`.trim().length;

  // Smoothly scale post-it size with text length.
  const maxLength = 1400;
  const normalized = Math.max(0, Math.min(totalLength / maxLength, 1));
  const easeOut = 1 - (1 - normalized) * (1 - normalized);

  const width = 430/1.12 + easeOut * (760/1.12 - 430/1.12);
  const minHeight = 250/2 + easeOut * (460/1.12 - 250/1.12);
  const titleSize = 1.25 - easeOut * (1.25 - 1.08);
  const fontSize = 0.92- easeOut * (0.92 - 0.79);
  const lineHeight = 1.56/1.12 - easeOut * (1.56/1.12 - 1.4/1.12);

  return {
    width: `${Math.round(width)}px`,
    minHeight: `${Math.round(minHeight)}px`,
    titleSize: `${titleSize.toFixed(3)}rem`,
    fontSize: `${fontSize.toFixed(3)}rem`,
    lineHeight: lineHeight.toFixed(3)
  };
}

function intersectsRect(particle, zone) {
  return (
    particle.x < zone.x + zone.width &&
    particle.x + particle.width > zone.x &&
    particle.y < zone.y + zone.height &&
    particle.y + particle.height > zone.y
  );
}

function bounceFromZone(particle, zone) {
  if (!intersectsRect(particle, zone)) {
    return;
  }

  const overlapLeft = particle.x + particle.width - zone.x;
  const overlapRight = zone.x + zone.width - particle.x;
  const overlapTop = particle.y + particle.height - zone.y;
  const overlapBottom = zone.y + zone.height - particle.y;

  const smallestOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

  if (smallestOverlap === overlapLeft) {
    particle.x -= overlapLeft;
    particle.vx = -Math.abs(particle.vx);
  } else if (smallestOverlap === overlapRight) {
    particle.x += overlapRight;
    particle.vx = Math.abs(particle.vx);
  } else if (smallestOverlap === overlapTop) {
    particle.y -= overlapTop;
    particle.vy = -Math.abs(particle.vy);
  } else {
    particle.y += overlapBottom;
    particle.vy = Math.abs(particle.vy);
  }
}

function ejectFromZoneWithinBounds(particle, zone) {
  if (!intersectsRect(particle, zone)) {
    return;
  }

  const candidates = [
    {
      axis: 'x',
      value: zone.x + zone.width,
      velocity: Math.abs(particle.vx),
      valid: zone.x + zone.width <= particle.maxX
    },
    {
      axis: 'y',
      value: zone.y + zone.height,
      velocity: Math.abs(particle.vy),
      valid: zone.y + zone.height <= particle.maxY
    },
    {
      axis: 'x',
      value: zone.x - particle.width,
      velocity: -Math.abs(particle.vx),
      valid: zone.x - particle.width >= particle.minX
    },
    {
      axis: 'y',
      value: zone.y - particle.height,
      velocity: -Math.abs(particle.vy),
      valid: zone.y - particle.height >= particle.minY
    }
  ];

  const choice = candidates.find(candidate => candidate.valid);
  if (!choice) {
    return;
  }

  if (choice.axis === 'x') {
    particle.x = choice.value;
    particle.vx = choice.velocity;
  } else {
    particle.y = choice.value;
    particle.vy = choice.velocity;
  }
}

function Thoughts() {
  const [motionMode, setMotionMode] = useState('wild');
  const [selectedNote, setSelectedNote] = useState(null);
  const [csvWords, setCsvWords] = useState([]);
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const noteRef = useRef(null);
  const wordRefs = useRef([]);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const lastFrameRef = useRef(0);
  const modeRef = useRef(motionMode);

  useEffect(() => {
    modeRef.current = motionMode;
  }, [motionMode]);

  useEffect(() => {
    let isMounted = true;

    const loadCsvWords = async () => {
      try {
        const response = await fetch('/word_to_link.csv');
        if (!response.ok) {
          return;
        }

        const csvText = await response.text();
        const rows = parseCsv(csvText);
        const parsed = rows.slice(1).reduce((acc, row, index) => {
          const word = row[0]?.trim();
          const value = row[1]?.trim();

          if (!word || !value) {
            return acc;
          }

          const isLink = /^https?:\/\//i.test(value);

          acc.push({
            id: `csv-${index}-${slugify(word)}`,
            seed: 1000 + index,
            label: word.toLowerCase(),
            title: word,
            slug: `csv-${slugify(word)}`,
            sourceText: isLink ? '' : value,
            body: isLink ? [] : [value],
            href: isLink ? value : '',
            external: isLink,
            pieceType: isLink ? 'external' : 'internal',
            openMode: isLink ? 'new-tab' : 'post-it'
          });

          return acc;
        }, []);

        if (isMounted) {
          setCsvWords(parsed);
        }
      } catch {
        // Ignore CSV loading errors and keep fallback words.
      }
    };

    loadCsvWords();

    return () => {
      isMounted = false;
    };
  }, []);

  const words = useMemo(() => {
    const baseWords = buildFloatingWords(40);
    if (csvWords.length === 0) {
      return baseWords.map(word => ({ ...word, openMode: 'none' }));
    }

    if (csvWords.length >= CSV_ONLY_MIN_LINES) {
      return csvWords.slice(0, 90);
    }

    const csvLabels = new Set(csvWords.map(word => word.label.toLowerCase()));
    const merged = [
      ...csvWords,
      ...baseWords
        .filter(word => !csvLabels.has(word.label.toLowerCase()))
        .map(word => ({ ...word, openMode: 'none' }))
    ];

    return merged.slice(0, 90);
  }, [csvWords]);

  const floatingWords = useMemo(
    () =>
      words.map((word, index) => {
        const baseMin = 0.2;
        const baseMax = 0.34;
        const fontSize = baseMin + Math.random() * (baseMax - baseMin);
        const variant = index % 4;
        const pulseDuration = 4.0 + Math.random() * 4.0;
        const pulseDelay = 0;
        const moveSpeedMultiplier = 0.45 + (((index * 11) % 14) / 13) * 0.45;

        return {
          ...word,
          variant,
          moveSpeedMultiplier,
          style: {
            fontSize: `${fontSize}rem`
          },
          pulseStyle: {
            animationDuration: `${pulseDuration}s`,
            animationDelay: `${pulseDelay}s`
          }
        };
      }),
    [words]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const getDirectionalBounds = (containerRect, width, height) => {
      let minX = 0;
      let minY = 0;
      let maxX = Math.max(containerRect.width - width, 0);
      let maxY = Math.max(containerRect.height - height, 0);

      if (introRef.current) {
        const introRect = introRef.current.getBoundingClientRect();
        const introX = introRect.left - containerRect.left;
        const introY = introRect.top - containerRect.top;
        minX = Math.max(minX, introX);
        minY = Math.max(minY, introY);
      }

      if (noteRef.current) {
        const noteRect = noteRef.current.getBoundingClientRect();
        const noteRight = noteRect.left - containerRect.left + noteRect.width;
        const noteBottom = noteRect.top - containerRect.top + noteRect.height;
        maxX = Math.min(maxX, Math.max(noteRight - width, 0));
        maxY = Math.min(maxY, Math.max(noteBottom - height, 0));
      }

      if (maxX < minX) {
        maxX = minX;
      }

      if (maxY < minY) {
        maxY = minY;
      }

      return { minX, minY, maxX, maxY };
    };

    const setupParticles = () => {
      const bounds = container.getBoundingClientRect();
      particlesRef.current = floatingWords.map((word, index) => {
        const element = wordRefs.current[index];
        // Inflate collision size so pulsing words still respect no-fly zones.
        const width = (element?.offsetWidth || 64) * WORD_COLLISION_SCALE_BUFFER;
        const height = (element?.offsetHeight || 20) * WORD_COLLISION_SCALE_BUFFER;
        const directionalBounds = getDirectionalBounds(bounds, width, height);
        const centerX = directionalBounds.minX + (directionalBounds.maxX - directionalBounds.minX) / 2;
        const centerY = directionalBounds.minY + (directionalBounds.maxY - directionalBounds.minY) / 2;
        const x = centerX;
        const y = centerY;
        const angle = Math.random() * Math.PI * 2;
        const baseSpeed = (22 + Math.random() * 58) * (word.moveSpeedMultiplier || 1);

        return {
          id: word.id,
          x,
          y,
          width,
          height,
          vx: Math.cos(angle) * baseSpeed,
          vy: Math.sin(angle) * baseSpeed,
          wobble: 7 + (index % 6) * 2,
          phase: index * 0.7,
          maxSpeed: 100 + (word.moveSpeedMultiplier || 1) * 55,
          minX: directionalBounds.minX,
          minY: directionalBounds.minY,
          maxX: directionalBounds.maxX,
          maxY: directionalBounds.maxY
        };
      });

      particlesRef.current.forEach((particle, index) => {
        const element = wordRefs.current[index];
        if (element) {
          element.style.setProperty('--word-x', `${particle.x}px`);
          element.style.setProperty('--word-y', `${particle.y}px`);
        }
      });
    };

    setupParticles();

    const animate = timestamp => {
      if (!lastFrameRef.current) {
        lastFrameRef.current = timestamp;
      }

      const delta = Math.min((timestamp - lastFrameRef.current) / 1000, 0.045);
      lastFrameRef.current = timestamp;
      const modeMultiplier = modeRef.current === 'wild' ? 1 : 0.48;
      const particles = particlesRef.current;
      const containerRect = container.getBoundingClientRect();
      const noFlyZones = [];

      if (introRef.current) {
        const introRect = introRef.current.getBoundingClientRect();
        noFlyZones.push({
          x: introRect.left - containerRect.left - 10,
          y: introRect.top - containerRect.top - 10,
          width: introRect.width + 20,
          height: introRect.height + 20
        });
      }

      if (noteRef.current) {
        const noteRect = noteRef.current.getBoundingClientRect();
        noFlyZones.push({
          x: noteRect.left - containerRect.left - 10,
          y: noteRect.top - containerRect.top - 10,
          width: noteRect.width + 20,
          height: noteRect.height + 20
        });
      }

      // Soft collision avoidance: nearby words repel each other to reduce overlap.
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const minDist = 54;

          if (distSq > 0 && distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minDist - dist) / minDist;
            const push = overlap * 34;

            a.vx -= nx * push;
            a.vy -= ny * push;
            b.vx += nx * push;
            b.vy += ny * push;

            a.x -= nx * overlap * 0.9;
            a.y -= ny * overlap * 0.9;
            b.x += nx * overlap * 0.9;
            b.y += ny * overlap * 0.9;
          }
        }
      }

      particles.forEach((particle, index) => {
        const element = wordRefs.current[index];
        if (!element) {
          return;
        }

        const liveBounds = getDirectionalBounds(containerRect, particle.width, particle.height);
        particle.minX = liveBounds.minX;
        particle.minY = liveBounds.minY;
        particle.maxX = liveBounds.maxX;
        particle.maxY = liveBounds.maxY;

        const wobbleX = Math.cos(timestamp * 0.001 + particle.phase) * particle.wobble;
        const wobbleY = Math.sin(timestamp * 0.00085 + particle.phase * 1.3) * particle.wobble;

        particle.vx += wobbleX * delta;
        particle.vy += wobbleY * delta;

        const speed = Math.hypot(particle.vx, particle.vy);
        const maxSpeed = particle.maxSpeed;
        if (speed > maxSpeed) {
          const factor = maxSpeed / speed;
          particle.vx *= factor;
          particle.vy *= factor;
        }

        particle.x += particle.vx * delta * modeMultiplier;
        particle.y += particle.vy * delta * modeMultiplier;

        if (particle.x <= particle.minX) {
          particle.x = particle.minX;
          particle.vx = Math.abs(particle.vx);
        } else if (particle.x >= particle.maxX) {
          particle.x = particle.maxX;
          particle.vx = -Math.abs(particle.vx);
        }

        if (particle.y <= particle.minY) {
          particle.y = particle.minY;
          particle.vy = Math.abs(particle.vy);
        } else if (particle.y >= particle.maxY) {
          particle.y = particle.maxY;
          particle.vy = -Math.abs(particle.vy);
        }

        noFlyZones.forEach(zone => {
          bounceFromZone(particle, zone);
        });

        // Keep strict corridor bounds after zone bounces as well.
        if (particle.x < particle.minX) {
          particle.x = particle.minX;
          particle.vx = Math.abs(particle.vx);
        } else if (particle.x > particle.maxX) {
          particle.x = particle.maxX;
          particle.vx = -Math.abs(particle.vx);
        }

        if (particle.y < particle.minY) {
          particle.y = particle.minY;
          particle.vy = Math.abs(particle.vy);
        } else if (particle.y > particle.maxY) {
          particle.y = particle.maxY;
          particle.vy = -Math.abs(particle.vy);
        }

        // Strictly eject from forbidden zones so words never remain on top of masked text.
        for (let attempt = 0; attempt < 2; attempt += 1) {
          noFlyZones.forEach(zone => {
            ejectFromZoneWithinBounds(particle, zone);
          });
        }

        element.style.setProperty('--word-x', `${particle.x}px`);
        element.style.setProperty('--word-y', `${particle.y}px`);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', setupParticles);

    return () => {
      window.removeEventListener('resize', setupParticles);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lastFrameRef.current = 0;
    };
  }, [floatingWords]);

  const closePostIt = () => setSelectedNote(null);
  const postItSize = selectedNote ? getPostItSize(selectedNote) : null;
  const noteParagraphs = selectedNote?.sourceText
    ? selectedNote.sourceText
        .split(/\r?\n+/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="thoughts-page" aria-label="Thoughts page">
      <div className="thoughts-glow thoughts-glow-one" aria-hidden="true" />
      <div className="thoughts-glow thoughts-glow-two" aria-hidden="true" />
      <div className="thoughts-grid" aria-hidden="true" />
      <div className="thoughts-stars" aria-hidden="true" />

      <header className="thoughts-intro" ref={introRef}>
        <h1>thoughts</h1>
        <p>a moving index of my thoughts</p>
      </header>

      <button
        type="button"
        className="motion-toggle"
        onClick={() => setMotionMode(prev => (prev === 'wild' ? 'calm' : 'wild'))}
      >
        motion: {motionMode}
      </button>

      <p className="thoughts-note" ref={noteRef}>take a look into my brain</p>

      <div className="thought-cloud" aria-label="Floating thought words" ref={containerRef}>
        {floatingWords.map((word, index) => {
          if (word.openMode === 'post-it') {
            return (
              <button
                type="button"
                key={word.id}
                className={`floating-word floating-word-button word-variant-${word.variant} word-internal`}
                style={word.style}
                title={`${word.title} (opens post-it)`}
                onClick={() => setSelectedNote(word)}
                ref={element => {
                  wordRefs.current[index] = element;
                }}
              >
                <span className="floating-word-label" style={word.pulseStyle}>
                  {word.label}
                </span>
              </button>
            );
          }

          if (word.openMode === 'new-tab') {
            return (
              <a
                key={word.id}
                href={word.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`floating-word word-variant-${word.variant} word-external`}
                style={word.style}
                title={`${word.title} (opens new tab)`}
                ref={element => {
                  wordRefs.current[index] = element;
                }}
              >
                <span className="floating-word-label" style={word.pulseStyle}>
                  {word.label}
                </span>
              </a>
            );
          }

          // Non-CSV fallback words are display-only and intentionally not clickable.
          return (
            <span
              key={word.id}
              className={`floating-word word-variant-${word.variant}`}
              style={word.style}
              title={word.title}
              ref={element => {
                wordRefs.current[index] = element;
              }}
            >
              <span className="floating-word-label" style={word.pulseStyle}>
                {word.label}
              </span>
            </span>
          );
        })}
      </div>

      {selectedNote && (
        <div
          className="post-it-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Thought note"
          onClick={closePostIt}
        >
          <article
            className="post-it-note"
            style={
              postItSize
                ? {
                    '--post-it-width': postItSize.width,
                    '--post-it-min-height': postItSize.minHeight,
                    '--post-it-title-size': postItSize.titleSize,
                    '--post-it-font-size': postItSize.fontSize,
                    '--post-it-line-height': postItSize.lineHeight
                  }
                : undefined
            }
            onClick={event => event.stopPropagation()}
          >
            <div className="post-it-content">
              <h2>{selectedNote.title}</h2>
              {noteParagraphs.length > 0
                ? noteParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)
                : <p>{selectedNote.sourceText}</p>}
              {selectedNote.body?.[0] && selectedNote.body[0] !== selectedNote.sourceText && (
                <p>{selectedNote.body[0]}</p>
              )}
            </div>
            <div className="post-it-actions">
              {selectedNote.slug && !selectedNote.slug.startsWith('csv-') && (
                <Link
                  to={`/thoughts/${selectedNote.slug}`}
                  className="post-it-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  open full post
                </Link>
              )}
              <button type="button" className="post-it-link post-it-close-bottom" onClick={closePostIt}>
                close
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}

export default Thoughts;
