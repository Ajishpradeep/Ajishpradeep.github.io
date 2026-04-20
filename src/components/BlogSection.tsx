import React, { useState } from 'react';
import { blogPosts, BlogPost, getAllTags } from '../utils/blogData';
import BlogCard from './BlogCard';

const BlogSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category'] | 'all'>('all');

  const allTags = getAllTags();
  const categories: Array<{ id: BlogPost['category'] | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'ALL', icon: 'fa-th' },
    { id: 'mathematics', label: 'MATHEMATICS', icon: 'fa-square-root-alt' },
    { id: 'vision', label: 'VISION', icon: 'fa-eye' },
    { id: 'language', label: 'LANGUAGE', icon: 'fa-comments' },
    { id: 'agents', label: 'AGENTS', icon: 'fa-robot' },
    { id: 'deployment', label: 'DEPLOYMENT', icon: 'fa-server' }
  ];

  // Filter posts
  let filteredPosts = blogPosts;

  if (selectedCategory !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
  }

  if (selectedTag) {
    filteredPosts = filteredPosts.filter(post => post.tags.includes(selectedTag));
  }

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div id="research-blog" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-bottom">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
        <h2 className="font-bold text-purple-400 flex items-center">
          <i className="fas fa-book mr-2"></i> RESEARCH BLOG & CASE STUDIES
        </h2>
        <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full">
          {filteredPosts.length} ARTICLE{filteredPosts.length !== 1 ? 'S' : ''}
        </span>
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b border-gray-800">
        <p className="text-xs text-gray-400 mb-2 font-bold">CATEGORY:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as BlogPost['category'] | 'all')}
              className={`category-btn text-xs px-3 py-1 rounded transition-all flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white border border-purple-400'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-purple-500'
              }`}
            >
              <i className={`fas ${cat.icon}`}></i>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div className="p-4 border-b border-gray-800">
        <p className="text-xs text-gray-400 mb-2 font-bold">FILTER BY TAG:</p>
        <div className="flex flex-wrap gap-2">
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded-full hover:bg-purple-800 flex items-center gap-1"
            >
              <i className="fas fa-times mr-1"></i>
              Clear: {selectedTag}
            </button>
          )}
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`tag-btn text-xs px-2 py-1 rounded-full transition-all ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-cyan-400 font-bold text-sm mb-3 flex items-center">
            <i className="fas fa-star mr-2"></i> FEATURED DEEP DIVES
          </h3>
          <div className="space-y-4">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <div className="p-4">
          <h3 className="text-gray-400 font-bold text-xs mb-3 uppercase">
            RESEARCH ARTICLES ({regularPosts.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {regularPosts.map(post => (
              <BlogCard key={post.id} post={post} featured={false} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="p-8 text-center">
          <i className="fas fa-search text-gray-600 text-2xl mb-2"></i>
          <p className="text-gray-500 text-sm">No case studies found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setSelectedCategory('all');
            }}
            className="text-xs text-purple-400 hover:text-purple-300 mt-2 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Future Content Notice */}
      <div className="p-4 bg-gray-950 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          <i className="fas fa-bulb mr-1"></i> More case studies coming soon as research expands to new domains.
        </p>
      </div>
    </div>
  );
};

export default BlogSection;
