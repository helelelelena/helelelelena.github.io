/*
  Photos Page
  
  Two carousel galleries: Brown University photos and travel photos.
  Images are loaded from the public folder.
*/

import Carousel from '../components/Carousel';
import './Photos.css';

function Photos() {
  // Brown University photos
  const baseUrl = import.meta.env.BASE_URL;
  const brownPhotos = [
    {
      id: 1,
      src: `${baseUrl}brown_quad.jpeg`,
      alt: 'Brown University Quad',
      caption: 'ruth simmons quad conversations'
    },
    {
      id: 2,
      src: `${baseUrl}brown_sunny.jpeg`,
      alt: 'Brown University on a sunny day',
      caption: 'sunny day on college hill'
    },
    {
      id: 3,
      src: `${baseUrl}brown_watson.jpeg`,
      alt: 'Watson Institute',
      caption: 'watson institute'
    },
    {
      id: 4,
      src: `${baseUrl}brown_sayles.jpeg`,
      alt: 'Sayles Hall',
      caption: 'sayles hall'
    },
    {
      id: 5,
      src: `${baseUrl}brown_ratty.jpeg`,
      alt: 'The Ratty',
      caption: 'the ratty'
    },
    {
      id: 6,
      src: `${baseUrl}brown_streets.jpeg`,
      alt: 'Brown streets',
      caption: 'college hill streets'
    },
    {
      id: 7,
      src: `${baseUrl}brown_mg.jpeg`,
      alt: 'Brown University',
      caption: 'main green'
    }
  ];

  // Travel and other photos
  const travelPhotos = [
    {
      id: 8,
      src: `${baseUrl}greece.jpeg`,
      alt: 'Greece',
      caption: 'athens, greece'
    },
    {
      id: 9,
      src: `${baseUrl}iceland_ice.jpeg`,
      alt: 'Iceland glacier',
      caption: 'ice climbing in iceland'
    },
    {
      id: 10,
      src: `${baseUrl}iceland_yellow_house.jpeg`,
      alt: 'Iceland landscape',
      caption: 'iceland countryside'
    },
    {
      id: 11,
      src: `${baseUrl}edinburgh.jpeg`,
      alt: 'Edinburgh',
      caption: 'edinburgh, scotland'
    },
    {
      id: 12,
      src: `${baseUrl}prague.jpeg`,
      alt: 'Prague',
      caption: 'prague, czechia'
    },
    {
      id: 13,
      src: `${baseUrl}vienna.jpeg`,
      alt: 'Vienna',
      caption: 'vienna, austria'
    },
    {
      id: 14,
      src: `${baseUrl}salzburg_top.jpeg`,
      alt: 'Salzburg view',
      caption: 'salzburg, austria'
    },
    {
      id: 15,
      src: `${baseUrl}heidelberg.jpeg`,
      alt: 'Heidelberg',
      caption: 'heidelberg, germany'
    },
    {
      id: 16,
      src: `${baseUrl}near_berlin.jpeg`,
      alt: 'Near Berlin',
      caption: 'potsdam, germany'
    },
    {
      id: 17,
      src: `${baseUrl}zugspitze.jpeg`,
      alt: 'Zugspitze',
      caption: 'zugspitze, germany'
    },
    {
      id: 18,
      src: `${baseUrl}cambridge.jpeg`,
      alt: 'Cambridge',
      caption: 'cambridge, uk'
    },
    {
      id: 19,
      src: `${baseUrl}venice.jpeg`,
      alt: 'Venice',
      caption: 'venice, italy'
    },
    {
      id: 20,
      src: `${baseUrl}venice_light.jpeg`,
      alt: 'Venice evening',
      caption: 'venice at dusk'
    },
    {
      id: 21,
      src: `${baseUrl}granada.jpeg`,
      alt: 'Granada',
      caption: 'granada, spain'
    },
    {
      id: 22,
      src: `${baseUrl}turkey.jpeg`,
      alt: 'Turkey',
      caption: 'istanbul, turkey'
    },
    {
      id: 23,
      src: `${baseUrl}kop.jpeg`,
      alt: 'Koppenhagen',
      caption: 'copenhagen, denmark'
    },
    {
      id: 24,
      src: `${baseUrl}kop_lighting.jpeg`,
      alt: 'Koppenhagen castle',
      caption: 'copenhagen castle through the trees'
    },
    {
      id: 25,
      src: `${baseUrl}mercado_central.jpeg`,
      alt: 'Mercado Central',
      caption: 'mercado central, belo horizonte, brazil'
    },
    {
      id: 26,
      src: `${baseUrl}farm.jpeg`,
      alt: 'Farm',
      caption: 'pedra azul, brazil'
    }
  ];

  return (
    <div className="photos-page">
      {/* Page header */}
      <header className="page-header">
        <h1>photos</h1>
        <p className="page-intro">
          moments at brown, at home, and abroad captured on film.
        </p>
      </header>

      {/* Brown University Carousel */}
      <Carousel photos={brownPhotos} title="brown university" />

      {/* Travel Carousel */}
      <Carousel photos={travelPhotos} title="miscellaneous" />
    </div>
  );
}

export default Photos;
