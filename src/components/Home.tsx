import { Link } from 'react-router-dom';
import { memo } from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center p-8 h-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          I'm a passionate developer creating modern web applications with React and TypeScript.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label="View my projects"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            aria-label="Contact me"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Home); 