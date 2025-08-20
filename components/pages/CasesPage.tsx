import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, Code, Gamepad2, Brain, Cloud, Smartphone, Globe } from '../ui/icons';
import { useTranslation } from '../../hooks/useTranslation';

interface CasesPageProps {
  onNavigate: (page: string) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  duration: string;
  teamSize: number;
  industry: string;
  featured: boolean;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export function CasesPage({ onNavigate }: CasesPageProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Enterprise AI Analytics Platform',
      client: 'TechCorp International',
      category: 'AI & Machine Learning',
      description: 'Developed a comprehensive AI-powered analytics platform for enterprise data processing and predictive insights.',
      challenge: 'The client needed to process massive amounts of data from multiple sources and generate actionable insights in real-time.',
      solution: 'We built a scalable AI platform using machine learning algorithms, real-time data processing, and interactive dashboards.',
      result: 'Achieved 300% improvement in data processing speed and 85% accuracy in predictive analytics.',
      technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'AWS', 'Docker'],
      duration: '8 months',
      teamSize: 12,
      industry: 'Technology',
      featured: true,
      image: '🤖',
      metrics: [
        { label: 'Processing Speed', value: '+300%' },
        { label: 'Prediction Accuracy', value: '85%' },
        { label: 'Cost Reduction', value: '40%' }
      ]
    },
    {
      id: '2',
      title: 'Mobile RPG Game',
      client: 'GameStudio Plus',
      category: 'Game Development',
      description: 'Created an immersive mobile RPG game with stunning graphics and engaging gameplay mechanics.',
      challenge: 'Develop a high-quality mobile game that could compete with top-tier titles while maintaining smooth performance across devices.',
      solution: 'Utilized Unity 3D engine with optimized graphics, implemented cloud save functionality, and created an engaging multiplayer system.',
      result: 'Game reached 1M+ downloads within 3 months and maintains 4.8-star rating on app stores.',
      technologies: ['Unity 3D', 'C#', 'Firebase', 'Photon', 'Blender'],
      duration: '14 months',
      teamSize: 8,
      industry: 'Gaming',
      featured: true,
      image: '🎮',
      metrics: [
        { label: 'Downloads', value: '1M+' },
        { label: 'App Store Rating', value: '4.8⭐' },
        { label: 'Daily Active Users', value: '50K+' }
      ]
    },
    {
      id: '3',
      title: 'Cloud Migration & Infrastructure',
      client: 'RetailChain Global',
      category: 'Cloud Solutions',
      description: 'Migrated legacy retail systems to cloud infrastructure with improved scalability and security.',
      challenge: 'Modernize outdated systems without disrupting business operations and ensure 99.9% uptime.',
      solution: 'Implemented phased migration strategy using AWS services, containerization, and automated deployment pipelines.',
      result: 'Reduced operational costs by 45% and improved system performance by 200%.',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      duration: '6 months',
      teamSize: 6,
      industry: 'Retail',
      featured: false,
      image: '☁️',
      metrics: [
        { label: 'Cost Reduction', value: '45%' },
        { label: 'Performance Boost', value: '+200%' },
        { label: 'Uptime', value: '99.9%' }
      ]
    },
    {
      id: '4',
      title: 'E-commerce Platform',
      client: 'Fashion Forward Inc.',
      category: 'Web Development',
      description: 'Built a modern e-commerce platform with advanced features and seamless user experience.',
      challenge: 'Create a scalable e-commerce solution that could handle high traffic and provide personalized shopping experiences.',
      solution: 'Developed a React-based frontend with Node.js backend, integrated AI recommendations, and implemented advanced search.',
      result: 'Increased conversion rates by 120% and reduced cart abandonment by 60%.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Stripe', 'Elasticsearch'],
      duration: '10 months',
      teamSize: 10,
      industry: 'E-commerce',
      featured: false,
      image: '🛒',
      metrics: [
        { label: 'Conversion Rate', value: '+120%' },
        { label: 'Cart Abandonment', value: '-60%' },
        { label: 'Page Load Speed', value: '2.1s' }
      ]
    },
    {
      id: '5',
      title: 'Healthcare Mobile App',
      client: 'MedCare Solutions',
      category: 'Mobile Development',
      description: 'Developed a secure healthcare mobile application for patient management and telemedicine.',
      challenge: 'Create a HIPAA-compliant mobile app with secure video consultations and patient data management.',
      solution: 'Built native iOS and Android apps with end-to-end encryption, integrated video calling, and secure data storage.',
      result: 'Enabled 50,000+ patients to access healthcare remotely and reduced appointment wait times by 70%.',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
      duration: '12 months',
      teamSize: 9,
      industry: 'Healthcare',
      featured: true,
      image: '🏥',
      metrics: [
        { label: 'Active Patients', value: '50K+' },
        { label: 'Wait Time Reduction', value: '70%' },
        { label: 'Security Rating', value: 'A+' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'AI & Machine Learning', label: 'AI & ML', icon: Brain },
    { id: 'Game Development', label: 'Games', icon: Gamepad2 },
    { id: 'Cloud Solutions', label: 'Cloud', icon: Cloud },
    { id: 'Web Development', label: 'Web', icon: Code },
    { id: 'Mobile Development', label: 'Mobile', icon: Smartphone }
  ];

  const filteredCases = caseStudies.filter(caseStudy => 
    selectedCategory === 'all' || caseStudy.category === selectedCategory
  );

  const featuredCases = caseStudies.filter(caseStudy => caseStudy.featured);

  return (
    <div className="min-h-screen bg-deep-blue">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-deep-blue to-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t.cases.title}
            </h1>
            <p className="text-xl text-soft-gray mb-8">
              {t.cases.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue neon-glow'
                    : 'bg-deep-blue text-warm-white hover:bg-medium-blue border border-border'
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      {featuredCases.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-warm-white">Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCases.map((caseStudy) => (
                <div key={caseStudy.id} className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full flex items-center justify-center text-2xl">
                          {caseStudy.image}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-warm-white mb-1">
                            {caseStudy.title}
                          </h3>
                          <p className="text-neon-blue font-medium">{caseStudy.client}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-neon-cyan text-deep-blue rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>

                    <p className="text-soft-gray mb-6 leading-relaxed">
                      {caseStudy.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {caseStudy.metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-neon-blue mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-soft-gray">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-soft-gray">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {caseStudy.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {caseStudy.teamSize} people
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-neon-blue hover:text-neon-cyan transition-colors">
                        View Details
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cases */}
      <section className="py-16 bg-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-warm-white">
            {selectedCategory === 'all' ? 'All Projects' : `${selectedCategory} Projects`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseStudy) => (
              <div key={caseStudy.id} className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-lg flex items-center justify-center text-xl">
                      {caseStudy.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-warm-white">{caseStudy.title}</h3>
                      <p className="text-sm text-soft-gray">{caseStudy.client}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue rounded-full text-sm font-medium">
                      {caseStudy.category}
                    </span>
                  </div>

                  <p className="text-soft-gray mb-4 text-sm line-clamp-3">
                    {caseStudy.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-deep-blue text-neon-blue rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {caseStudy.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-deep-blue text-soft-gray rounded text-xs">
                        +{caseStudy.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-soft-gray">
                    <span>{caseStudy.industry}</span>
                    <button className="flex items-center gap-1 text-neon-blue hover:text-neon-cyan transition-colors">
                      Details
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-soft-gray text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-warm-white mb-4">
            Ready to start your project?
          </h2>
          <p className="text-soft-gray mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with our proven expertise and innovative solutions.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue font-semibold py-3 px-8 rounded-lg hover:scale-105 transition-all duration-300 neon-glow"
          >
            Start Your Project
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}