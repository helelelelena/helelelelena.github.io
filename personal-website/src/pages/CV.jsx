/*
  CV/Resume Page
  
  Displays your CV/Resume with:
  1. Embedded PDF viewer
  2. Download button
  
  The PDF is stored in the public folder and accessible via the path.
*/

import './CV.css';

function CV() {
  // Path to your resume PDF in the public folder
  const cvPdfPath = '/HSB_AResume.pdf';

  return (
    <div className="cv-page">
      {/* Page header */}
      <header className="page-header">
        <h1>curriculum vitae</h1>
        <p className="page-intro">
          my academic and professional experience
        </p>
        
        {/* Download button */}
        <div className="cv-actions">
          <a 
            href={cvPdfPath} 
            download="Helena_Soares_Barros_Resume.pdf"
            className="download-button"
          >
            download resume (pdf)
          </a>
        </div>
      </header>

      {/* Embedded PDF viewer */}
      <div className="cv-embed">
        <iframe
          src={cvPdfPath}
          title="Helena's Resume"
          className="cv-iframe"
        />
      </div>
    </div>
  );
}

export default CV;
