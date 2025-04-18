import { Link } from 'react-router-dom';
import { memo } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Portfolio',
    description: 'A modern portfolio website with AI integration, built using React, TypeScript, and Tailwind CSS. Features include Gemini AI integration, responsive design, and SEO optimization.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
    imageUrl: '/images/portfolio.jpg',
    projectUrl: 'https://ajish.online',
    githubUrl: 'https://github.com/Ajishpradeep/portfolio'
  },
  {
    id: 2,
    title: 'Vision AI Research',
    description: 'Research and development in Computer Vision and AI, focusing on object detection, image classification, and deep learning models.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
    imageUrl: '/images/vision-ai.jpg',
    projectUrl: 'https://github.com/Ajishpradeep/vision-ai-research'
  },
  {
    id: 3,
    title: 'LLM Optimization',
    description: 'Research and implementation of Large Language Model optimization techniques, including quantization, pruning, and efficient inference.',
    technologies: ['Python', 'Hugging Face', 'TensorRT', 'ONNX'],
    imageUrl: '/images/llm-optimization.jpg',
    projectUrl: 'https://github.com/Ajishpradeep/llm-optimization'
  }
];

// Memoized ProjectCard component for better performance
const ProjectCard = memo(({ project }: { project: Project }) => (
  <article
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 focus-within:scale-105"
    tabIndex={0}
  >
    <div className="relative h-48 md:h-56">
      <img
        src={project.imageUrl}
        alt={`${project.title} project screenshot`}
        className="w-full h-full object-cover"
        loading="lazy"
        width={400}
        height={300}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden="true"
      />
    </div>
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        {project.title}
      </h2>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs md:text-sm"
            role="listitem"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center text-sm md:text-base"
          aria-label={`View ${project.title} project`}
        >
          View Project
        </a>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center text-sm md:text-base"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </article>
));

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          My Projects
        </h1>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Project list"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Projects); 