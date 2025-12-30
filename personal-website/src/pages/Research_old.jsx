/*
  Research Page
  
  Displays research projects and academic work.
  Uses the ProjectCard component to render each project.
  
  Key concept: Component reusability
  - We define project data in an array
  - Use map() to create a ProjectCard for each project
  - This makes it easy to add/remove projects by editing the data
*/

import ProjectCard from '../components/ProjectCard';
import './Research.css';

function Research() {
  // Project data - replace this with your actual projects
  // This array of objects is a common pattern for managing list data
  // Research and project data based on Helena's resume
const projects = [
  {
    id: 1,
    title: "Precipitation Variability in South America",
    description:
      "Honors thesis research in Brown’s Earth & Environmental Sciences Department. Analyzing global and regional rainfall datasets to study precipitation variability, daily rainfall cycles, and extreme events in tropical regions. Adapted and optimized MATLAB rainfall-processing scripts into Python to improve reproducibility and reduce runtime, and expanded the pipeline to classify convective weather systems.",
    tags: [
      "Climate Science",
      "Python",
      "xarray",
      "NetCDF",
      "Rainfall Analysis",
      "Honors Thesis"
    ],
    links: {
      poster: "#"
    }
  },
  {
    id: 2,
    title: "Violence Against Environmental and Indigenous Activists in Brazil",
    description:
      "Research assistant at the Democratic Erosion Lab at Brown University. Built an end-to-end Python pipeline to extract and clean data from Portuguese-language PDFs documenting land-related violence in Brazil. Developed an NLP classifier with ~90% accuracy to identify violent incidents, enabling scalable analysis of over 2,000 records and revealing increased violence during the 2020–2024 political cycle.",
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
      "Final project for a Mathematics & Climate course. Implemented a three-box ocean circulation model in Python to study nonlinear responses of the Atlantic Meridional Overturning Circulation (AMOC) to freshwater perturbations. Analyzed parameter regimes associated with tipping-point behavior and compared results to recent peer-reviewed literature.",
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
      "Built a supervised machine learning pipeline using meteorological and satellite data (ERA5, MODIS) to predict wildfire occurrence, cause, and burn severity. Applied Random Forest and XGBoost models and conducted feature importance analysis to identify key environmental drivers and support post-fire assessment efforts.",
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
      "Ongoing project reproducing and extending a Temporal Fusion Transformer (TFT) architecture for multi-horizon precipitation forecasting. Experimenting with soil-moisture-only predictors and additional geographic regions to test model generalizability, with validation using quantile loss metrics.",
    tags: [
      "Deep Learning",
      "Transformers",
      "Extreme Weather",
      "Time Series Forecasting"
    ],
    links: {}
  }
];
<section className="wip-section">
  <h2>Work in Progress</h2>
  <p>
    Ongoing work includes deep learning approaches for extreme precipitation
    forecasting, extensions of climate modeling pipelines, and exploratory
    projects at the intersection of machine learning, Earth systems, and
    environmental risk.
  </p>
</section>

export { projects };