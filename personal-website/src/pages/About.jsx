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
            src="/foto_perfil.jpg" 
            alt="Helena (me!) photographing outdoors with a film camera" 
            className="profile-photo"
          />
          <div className="hero-text">
            <h1 className="hero-title">hi, i'm helena :)</h1>
            <p className="hero-subtitle">
              applied math & computer science student
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="about-content">
        <h2>about me</h2>
        <p>
          I am an applied mathematics and computer science student at Brown University, 
          with research interests in climate dynamics, sustainability, and data-driven 
          approaches to social and environmental problems. I am particularly interested 
          in how mathematical models and machine learning can be used to better understand 
          complex Earth systems and their interaction with human institutions.
        </p>
        
        <p>
          My academic and research experiences span climate data analysis, environmental 
          governance, and computational modeling, often in interdisciplinary settings. 
          I am drawn to projects that combine physical intuition with quantitative rigor, 
          and that aim to produce insights with real-world relevance.
        </p>

        <p>
          I value collaborative, multicultural research environments and enjoy working at 
          the boundary between theory, computation, and applied impact.
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
