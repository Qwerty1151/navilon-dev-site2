import React from 'react';
import { Code, Gamepad2, Brain, Cloud, Smartphone, Globe, ArrowRight, Check, Star } from '../ui/icons';
import { useTranslation } from '../../hooks/useTranslation';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t } = useTranslation();

  const services = [
    {
      icon: Code,
      title: t.services.software.title,
      description: t.services.software.description,
      features: [
        'Custom Web Applications',
        'Enterprise Software Solutions',
        'API Development & Integration',
        'Database Design & Optimization',
        'Legacy System Modernization',
        'Performance Optimization'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
      color: 'text-neon-blue',
      bgColor: 'bg-neon-blue'
    },
    {
      icon: Gamepad2,
      title: t.services.games.title,
      description: t.services.games.description,
      features: [
        'Mobile Game Development',
        'PC & Console Games',
        'AR/VR Experiences',
        'Multiplayer Systems',
        'Game Engine Optimization',
        'Live Operations & Analytics'
      ],
      technologies: ['Unity 3D', 'Unreal Engine', 'C#', 'C++', 'Blender', 'Photon'],
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan'
    },
    {
      icon: Brain,
      title: t.services.ai.title,
      description: t.services.ai.description,
      features: [
        'Machine Learning Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'AI Chatbots & Assistants',
        'Automation Solutions'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'AWS ML', 'Docker'],
      color: 'text-electric-blue',
      bgColor: 'bg-electric-blue'
    },
    {
      icon: Cloud,
      title: t.services.cloud.title,
      description: t.services.cloud.description,
      features: [
        'Cloud Migration Services',
        'Infrastructure as Code',
        'Containerization & Orchestration',
        'CI/CD Pipeline Setup',
        'Cloud Security & Compliance',
        'Cost Optimization'
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
      color: 'text-neon-blue',
      bgColor: 'bg-neon-blue'
    },
    {
      icon: Smartphone,
      title: t.services.mobile.title,
      description: t.services.mobile.description,
      features: [
        'Native iOS & Android Apps',
        'Cross-Platform Development',
        'Mobile UI/UX Design',
        'App Store Optimization',
        'Push Notifications',
        'Mobile Analytics Integration'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan'
    },
    {
      icon: Globe,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      features: [
        'Technology Strategy & Planning',
        'Digital Transformation',
        'System Architecture Design',
        'Code Reviews & Audits',
        'Team Augmentation',
        'Project Management'
      ],
      technologies: ['Agile', 'Scrum', 'DevOps', 'Microservices', 'API Design', 'Security'],
      color: 'text-electric-blue',
      bgColor: 'bg-electric-blue'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, requirements, and constraints to create a detailed project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Our team designs the system architecture and creates detailed technical specifications and user experience designs.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using agile methodologies with continuous testing and quality assurance throughout the process.'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'We deploy your solution and provide ongoing support, maintenance, and optimization to ensure peak performance.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp',
      role: 'CTO',
      content: 'Navilon Dev delivered exceptional results on our AI project. Their expertise and professionalism exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'GameStudio',
      role: 'CEO',
      content: 'The mobile game they developed for us became our top-performing title. Highly recommended for game development projects.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-deep-blue">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-deep-blue to-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t.services.title}
            </h1>
            <p className="text-xl text-soft-gray mb-8">
              {t.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="glass-effect rounded-2xl p-8 hover:neon-glow transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center neon-glow`}>
                    <service.icon className="h-8 w-8 text-deep-blue" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${service.color} mb-2`}>
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-soft-gray mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-warm-white font-semibold mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                        <span className="text-soft-gray text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-warm-white font-semibold mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-deep-blue text-neon-blue rounded-full text-sm border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('contact')}
                  className={`flex items-center gap-2 ${service.color} hover:text-neon-cyan transition-colors duration-300 font-medium`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-warm-white">Our Process</h2>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full mb-6 neon-glow">
                  <span className="text-xl font-bold text-deep-blue">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-warm-white mb-4">
                  {step.title}
                </h3>
                <p className="text-soft-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-warm-white">Client Success Stories</h2>
            <p className="text-xl text-soft-gray max-w-3xl mx-auto">
              See what our clients say about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect rounded-2xl p-8 hover:neon-glow transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-neon-cyan" />
                  ))}
                </div>
                
                <p className="text-soft-gray mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full flex items-center justify-center">
                    <span className="text-deep-blue font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-warm-white">{testimonial.name}</div>
                    <div className="text-sm text-soft-gray">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medium-blue to-deep-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-warm-white mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-soft-gray mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution that drives results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue font-semibold py-3 px-8 rounded-lg hover:scale-105 transition-all duration-300 neon-glow"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('cases')}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-neon-blue text-neon-blue font-semibold py-3 px-8 rounded-lg hover:bg-neon-blue hover:text-deep-blue transition-all duration-300"
            >
              View Our Work
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}