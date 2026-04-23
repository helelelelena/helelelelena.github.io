/*
  Research Page
  
  Displays research projects organized by category.
  Features honors thesis prominently, followed by completed and ongoing work.
*/

import ProjectCard from '../components/ProjectCard';
import './Research.css';

function Research() {
  // Research and project data - organized by category
  const projects = [
    {
      id: 1,
      title: "Land Use Change and Climate in the Cerrado",
      description:
        "Honors thesis in Applied Mathematics-Computer Science, conducted in Brown's Earth & Environmental Sciences Department. Analyzing the relationship between land use and land cover (LULC) change and regional climate trends across the Cerrado, Brazil's biodiversity hotspot. Combines Mapbiomas LULC data, INMET meteorological records, MODIS NDVI, and ERA5 skin surface temperature to assess how agricultural expansion since 2001 has shaped observed temperature and vegetation trends.",
      tags: [
        "Climate Science",
        "Python",
        "Machine Learning",
        "Land Use Change",
        "Remote Sensing",
        "NDVI",
        "Cerrado",
        "Honors Thesis"
      ],
      links: {},
      featured: true
    },
    {
      id: 2,
      title: "Violence Against Environmental and Indigenous Activists in Brazil",
      description:
        "Research assistant at the Democratic Erosion Lab. Built an end-to-end Python pipeline to extract and clean data from Portuguese-language PDFs documenting land-related violence in Brazil. Developed an NLP classifier with ~90% accuracy to identify violent incidents, enabling scalable analysis of over 2,000 records and revealing increased violence during the 2020–2024 political cycle.",
      tags: [
        "NLP",
        "Python",
        "Data Engineering",
        "Political Violence",
        "Environmental Justice"
      ],
      links: {}
    },
    {
      id: 3,
      title: "Amazon River Discharge & AMOC Sensitivity",
      description:
        "Final project for Mathematics & Climate course implementing a three-box ocean circulation model in Python to study nonlinear responses of the Atlantic Meridional Overturning Circulation (AMOC) to freshwater perturbations. Analyzed parameter regimes associated with tipping-point behavior and compared results to recent peer-reviewed literature.",
      tags: [
        "Climate Modeling",
        "Ocean Circulation",
        "Python",
        "Nonlinear Dynamics"
      ],
      links: {}
    },
    {
      id: 4,
      title: "Machine Learning for Wildfire Prediction",
      description:
        "Supervised machine learning pipeline using meteorological and satellite data (ERA5, MODIS) to predict wildfire occurrence, cause, and burn severity. Applied Random Forest and XGBoost models with feature importance analysis to identify key environmental drivers and support post-fire assessment efforts.",
      tags: [
        "Machine Learning",
        "Wildfires",
        "Remote Sensing",
        "ERA5",
        "MODIS"
      ],
      links: {}
    },
    {
      id: 5,
      title: "Deep Learning for Extreme Precipitation Forecasting",
      description:
        "Reproducing and extending a Temporal Fusion Transformer (TFT) architecture for multi-horizon precipitation forecasting. Experimenting with soil-moisture-only predictors and additional geographic regions to test model generalizability, with validation using quantile loss metrics.",
      tags: [
        "Deep Learning",
        "Transformers",
        "Extreme Weather",
        "Time Series Forecasting"
      ],
      links: {
        poster: "https://docs.google.com/presentation/d/1mPv58csaJgK0WDBEiXfnSQoYmqqemDju/edit?usp=sharing&ouid=101129314482559623028&rtpof=true&sd=true"
      }
    },
    {
      id: 6,
      title: "Global Precipitation Analysis",
      description:
        "Course project for Climate Modeling analyzing global precipitation trends using CMIP6 climate model output. Characterized rainfall intensity distributions across latitudes, revealing the Intertropical Convergence Zone signature, and examined long-term changes under both historical simulations (GISS-E2-1-G, 1850–2014) and the SSP5-8.5 high-emissions scenario (MPI-ESM1-2-LR, 2015–2100). Applied cosine-latitude weighting for global mean precipitation and computed signal-to-noise ratios to quantify trend significance.",
      tags: [
        "Climate Science",
        "Python",
        "CMIP6",
        "Precipitation",
        "NetCDF",
        "xarray"
      ],
      links: {
        poster: "https://docs.google.com/presentation/d/1SLsMsAAiqD5nZipADC1L9j5Nm8d3XbvC/edit?usp=sharing&ouid=101129314482559623028&rtpof=true&sd=true"
      }
    }
  ];

  // Separate featured and ongoing projects
  const featuredProjects = projects.filter(p => p.featured);
  const ongoingProjects = projects.filter(p => p.ongoing);
  const completedProjects = projects.filter(p => !p.featured && !p.ongoing);

  return (
    <div className="research-page">
      {/* Page header */}
      <header className="page-header">
        <h1>research & projects</h1>
        <p className="page-intro">
          selected research and projects in applied mathematics, computation, 
          and climate-related systems
        </p>
      </header>

      {/* Featured Project - Honors Thesis */}
      {featuredProjects.length > 0 && (
        <section className="featured-section">
          <h2 className="section-subtitle">honors thesis</h2>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              links={project.links}
            />
          ))}
        </section>
      )}

      {/* Completed Projects */}
      <section className="projects-section">
        <h2 className="section-subtitle">completed projects</h2>
        <div className="projects-grid">
          {completedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              links={project.links}
            />
          ))}
        </div>
      </section>

      {/* Ongoing Work */}
      {ongoingProjects.length > 0 && (
        <section className="ongoing-section">
          <h2 className="section-subtitle">ongoing work</h2>
          <div className="projects-grid">
            {ongoingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                links={project.links}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Research;
