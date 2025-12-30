/*
  ProjectCard Component
  
  A reusable card component for displaying research projects.
  
  Props (data passed to this component):
  - title: Project name
  - description: Brief project description
  - tags: Array of technology/topic tags
  - links: Object with optional 'github', 'demo', 'paper' URLs
  
  This demonstrates the power of props - we can reuse this component
  for multiple projects by passing different data.
*/

import './ProjectCard.css';

function ProjectCard({ title, description, tags, links }) {
  return (
    <article className="project-card">
      {/* Project header */}
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
      </div>

      {/* Project description */}
      <p className="project-description">{description}</p>

      {/* Tags section */}
      {tags && tags.length > 0 && (
        <div className="project-tags">
          {/* 
            map() creates a tag element for each item in the tags array
            key={tag} helps React track which items changed
          */}
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links section */}
      {links && (
        <div className="project-links">
          {/* 
            Conditional rendering: only show links that exist
            && means "if the first part is true, render the second part"
          */}
          {links.github && (
            <a 
              href={links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              GitHub →
            </a>
          )}
          {links.demo && (
            <a 
              href={links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              Demo →
            </a>
          )}
          {links.paper && (
            <a 
              href={links.paper} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              paper →
            </a>
          )}
          {links.poster && (
            <a 
              href={links.poster} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              poster →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
