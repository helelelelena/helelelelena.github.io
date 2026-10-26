/*
  About Page (Home)
  
  This is the landing page of the website.
  It introduces you and provides a brief overview of who you are.
  
  Note: This uses placeholder content in first person.
  Replace with your actual information later.
*/

import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Hero section with photo */}
      <section className="hero">
        <div className="hero-content">
          <img 
            src={`${import.meta.env.BASE_URL}foto_perfil.jpg`}
            alt="Helena (me!) photographing outdoors with a film camera" 
            className="profile-photo"
          />
          <div className="hero-text">
            <h1 className="hero-title">hi, i'm helena :)</h1>
            <p className="hero-subtitle">
              applied math & computer science student
              <br />
              incoming PhD student at CU Boulder ATOC
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="about-content">
        <h2>about me</h2>
          <p>
            I am a first-year PhD student in Atmospheric and Oceanic Sciences at the University of Colorado Boulder. 
            With a background in applied mathematics and computer science from Brown University, I am interested 
            in using mathematical modeling, computational methods, and machine learning to better understand 
            climate dynamics and their interactions with human systems.
          </p>
          <p>
            During my time at Brown, my academic and research experiences spanned climate data analysis, 
            environmental governance, and computational modeling, often in interdisciplinary settings. 
            I am currently a member of the CHAOS & Predictability Research Group, led by Dr. Aneesh Subramanian.
          </p>
          <p>
            I value collaborative, multicultural research environments and enjoy working at the intersection of 
            mathematical theory, computational methods, and real-world applications.
          </p>

        {/* Call to action */}
        <div className="cta-section">
          <h3>let's connect!</h3>
          <p>
            I'm always interested in collaborating on interesting projects or 
            discussing research ideas. Feel free to reach out!
          </p>
          {/* Add your contact information or links here */}
          <div className="contact-links">
            <a href="mailto:helena_soares_barros@brown.edu" className="cta-button">
              get in touch!
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
