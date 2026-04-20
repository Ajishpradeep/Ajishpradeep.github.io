import React from 'react';
import { BlogPost } from '../utils/blogData';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
    mathematics: { bg: 'bg-cyan-900', text: 'text-cyan-400', icon: 'fa-square-root-alt' },
    vision: { bg: 'bg-green-900', text: 'text-green-400', icon: 'fa-eye' },
    language: { bg: 'bg-orange-900', text: 'text-orange-400', icon: 'fa-comments' },
    agents: { bg: 'bg-purple-900', text: 'text-purple-400', icon: 'fa-robot' },
    deployment: { bg: 'bg-yellow-900', text: 'text-yellow-400', icon: 'fa-server' }
  };

  const colors = categoryColors[post.category] || categoryColors.mathematics;

  return (
    <div
      className={`bg-gray-950 rounded border transition-all cursor-pointer hover:scale-105 ${
        featured
          ? `border-cyan-700 hover:border-cyan-500 p-4`
          : `border-gray-800 hover:border-${post.category}-700 p-3`
      }`}
    >
      {/* Header with Category */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className={`font-bold ${colors.text} ${featured ? 'text-lg' : 'text-base'}`}>
            {post.title}
          </h3>
          <div className={`text-xs ${colors.text} mt-1`}>
            <i className={`fas ${colors.icon} mr-1`}></i>
            {post.category.toUpperCase()}
          </div>
        </div>
        <span className={`text-xs ${colors.bg} ${colors.text} px-2 py-1 rounded-full whitespace-nowrap ml-2`}>
          {featured ? 'FEATURED' : 'RESEARCH'}
        </span>
      </div>

      {/* Summary */}
      <p className={`text-gray-400 mb-3 ${featured ? 'text-sm' : 'text-xs'}`}>
        {post.summary}
      </p>

      {/* Key Insights */}
      {featured && (
        <div className="mb-3 bg-gray-900 rounded p-2 border border-gray-800">
          <p className="text-xs font-bold text-gray-400 mb-2">KEY INSIGHTS:</p>
          <ul className="space-y-1">
            {post.keyInsights.slice(0, 3).map((insight, idx) => (
              <li key={idx} className="text-xs text-gray-500 list-disc ml-4">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.slice(0, featured ? 4 : 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer with Date and Links */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>

        <div className="flex gap-2">
          {post.externalLink && (
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${colors.text} hover:underline flex items-center`}
            >
              <i className="fas fa-external-link-alt mr-1"></i>
              {featured ? 'VIEW ARTICLE' : 'VIEW'}
            </a>
          )}
          {post.pdfLink && (
            <a
              href={post.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${colors.text} hover:underline flex items-center`}
            >
              <i className="fas fa-file-pdf mr-1"></i>
              PDF
            </a>
          )}
          {post.githubLink && (
            <a
              href={post.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${colors.text} hover:underline flex items-center`}
            >
              <i className="fab fa-github mr-1"></i>
              {featured ? 'GITHUB' : 'CODE'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
