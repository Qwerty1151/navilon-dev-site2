import React, { useState } from 'react';
import { Calendar, Clock, Eye, ArrowRight, Search, Filter } from '../ui/icons';
import { useTranslation } from '../../hooks/useTranslation';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  views: number;
  featured: boolean;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI in Software Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build software applications.',
      content: 'AI is transforming software development...',
      author: 'Alex Thompson',
      date: '2024-01-15',
      readTime: 8,
      category: 'AI & Machine Learning',
      tags: ['AI', 'Development', 'Future'],
      views: 1247,
      featured: true
    },
    {
      id: '2',
      title: 'Best Practices for Mobile Game Development',
      excerpt: 'Key strategies and techniques for creating engaging mobile games that users love.',
      content: 'Mobile game development requires...',
      author: 'Sarah Martinez',
      date: '2024-01-10',
      readTime: 12,
      category: 'Game Development',
      tags: ['Mobile', 'Games', 'Development'],
      views: 892,
      featured: false
    },
    {
      id: '3',
      title: 'Cloud-First Architecture: A Complete Guide',
      excerpt: 'Understanding the principles and benefits of cloud-first architecture for modern applications.',
      content: 'Cloud-first architecture is...',
      author: 'Michael Chen',
      date: '2024-01-05',
      readTime: 15,
      category: 'Cloud Computing',
      tags: ['Cloud', 'Architecture', 'DevOps'],
      views: 1156,
      featured: true
    },
    {
      id: '4',
      title: 'JavaScript Frameworks in 2024: What to Choose?',
      excerpt: 'A comprehensive comparison of popular JavaScript frameworks and their use cases.',
      content: 'Choosing the right JavaScript framework...',
      author: 'Elena Rodriguez',
      date: '2023-12-28',
      readTime: 10,
      category: 'Web Development',
      tags: ['JavaScript', 'Frameworks', 'React'],
      views: 2043,
      featured: false
    }
  ];

  const categories = [
    'all',
    'AI & Machine Learning',
    'Game Development', 
    'Cloud Computing',
    'Web Development',
    'Mobile Development'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-deep-blue">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-deep-blue to-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t.blog.title}
            </h1>
            <p className="text-xl text-soft-gray mb-8">
              {t.blog.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-soft-gray" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-deep-blue border border-border rounded-lg text-warm-white placeholder-soft-gray focus:outline-none focus:ring-2 focus:ring-neon-blue"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-soft-gray" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-deep-blue border border-border rounded-lg px-4 py-3 text-warm-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-warm-white">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-neon-blue text-deep-blue rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="px-3 py-1 bg-neon-cyan text-deep-blue rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-warm-white mb-4 hover:text-neon-blue transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-soft-gray mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-soft-gray mb-6">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime} {t.blog.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-warm-white font-medium">{post.author}</span>
                      <button className="flex items-center gap-2 text-neon-blue hover:text-neon-cyan transition-colors">
                        {t.common.readMore}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-warm-white">
            {selectedCategory === 'all' ? 'All Articles' : selectedCategory}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-warm-white mb-3 hover:text-neon-blue transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-soft-gray mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-soft-gray mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} {t.blog.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-warm-white font-medium text-sm">{post.author}</span>
                    <button className="flex items-center gap-1 text-neon-blue hover:text-neon-cyan transition-colors text-sm">
                      {t.common.readMore}
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-soft-gray text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}