import React, { useState } from 'react';
import { MapPin, Clock, Users, Award, ArrowRight, Send } from '../ui/icons';
import { useTranslation } from '../../hooks/useTranslation';

interface CareersPageProps {
  onNavigate: (page: string) => void;
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Warsaw, Poland',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Join our engineering team to build cutting-edge web applications using modern technologies.',
      requirements: [
        'Strong experience with React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Knowledge of database design and optimization',
        'Excellent problem-solving and communication skills',
        'Experience with Agile development methodologies'
      ],
      responsibilities: [
        'Develop and maintain web applications',
        'Collaborate with cross-functional teams',
        'Code review and mentoring junior developers',
        'Participate in architectural decisions',
        'Ensure code quality and best practices'
      ],
      benefits: [
        'Competitive salary and equity',
        'Remote work flexibility',
        'Health insurance',
        'Professional development budget',
        'Annual team retreats'
      ]
    },
    {
      id: '2',
      title: 'Game Developer (Unity)',
      department: 'Game Development',
      location: 'Remote / Berlin, Germany',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Create engaging mobile and PC games using Unity engine and C#.',
      requirements: [
        'Proficiency in Unity 3D and C#',
        'Experience with mobile game development',
        'Knowledge of game physics and animation',
        'Understanding of game optimization techniques',
        'Portfolio of published games'
      ],
      responsibilities: [
        'Develop game mechanics and systems',
        'Optimize game performance',
        'Collaborate with artists and designers',
        'Implement gameplay features',
        'Debug and fix issues'
      ],
      benefits: [
        'Creative freedom in projects',
        'Latest gaming hardware',
        'Flexible working hours',
        'Game development courses',
        'Team gaming sessions'
      ]
    },
    {
      id: '3',
      title: 'AI/ML Engineer',
      department: 'AI & Innovation',
      location: 'Remote / San Francisco, USA',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Develop and deploy machine learning models and AI solutions for our clients.',
      requirements: [
        'Strong background in machine learning and AI',
        'Experience with Python, TensorFlow, or PyTorch',
        'Knowledge of cloud ML services',
        'Experience with data preprocessing and analysis',
        'PhD or Masters in related field preferred'
      ],
      responsibilities: [
        'Design and implement ML models',
        'Research new AI technologies',
        'Collaborate with data scientists',
        'Deploy models to production',
        'Monitor and improve model performance'
      ],
      benefits: [
        'Cutting-edge AI projects',
        'Conference attendance budget',
        'Research publication opportunities',
        'Collaborative work environment',
        'Stock options'
      ]
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote / London, UK',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
      requirements: [
        'Experience with AWS, Azure, or GCP',
        'Proficiency in Docker and Kubernetes',
        'Knowledge of CI/CD pipelines',
        'Infrastructure as Code (Terraform, CloudFormation)',
        'Monitoring and logging tools experience'
      ],
      responsibilities: [
        'Maintain cloud infrastructure',
        'Automate deployment processes',
        'Monitor system performance',
        'Ensure security and compliance',
        'Support development teams'
      ],
      benefits: [
        'Latest cloud technologies',
        'Certification support',
        'Flexible schedule',
        'Learning stipend',
        'Health and wellness programs'
      ]
    }
  ];

  const departments = ['all', 'Engineering', 'Game Development', 'AI & Innovation', 'Infrastructure', 'Design', 'Marketing'];

  const filteredJobs = jobPositions.filter(job => 
    selectedDepartment === 'all' || job.department === selectedDepartment
  );

  const benefits = [
    {
      icon: Users,
      title: 'International Team',
      description: 'Work with talented professionals from around the world'
    },
    {
      icon: Award,
      title: 'Growth Opportunities',
      description: 'Continuous learning and career advancement programs'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options'
    },
    {
      icon: MapPin,
      title: 'Global Presence',
      description: 'Opportunities to work across multiple time zones and cultures'
    }
  ];

  return (
    <div className="min-h-screen bg-deep-blue">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-deep-blue to-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              {t.careers.title}
            </h1>
            <p className="text-xl text-soft-gray mb-8">
              {t.careers.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-16 bg-medium-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-warm-white">
              {t.careers.whyWorkHere}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 glass-effect rounded-2xl hover:neon-glow transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full mb-4 neon-glow">
                  <benefit.icon className="h-8 w-8 text-deep-blue" />
                </div>
                <h3 className="text-xl font-semibold text-warm-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-soft-gray">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-warm-white">
              {t.careers.openPositions}
            </h2>
            
            {/* Department Filter */}
            <div className="flex justify-center mb-8">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-deep-blue border border-border rounded-lg px-4 py-2 text-warm-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="glass-effect rounded-2xl p-8 hover:neon-glow transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-warm-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-neon-blue text-deep-blue rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-neon-cyan text-deep-blue rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-soft-gray">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-soft-gray">
                    <Clock className="h-4 w-4" />
                    <span>{job.experience} experience required</span>
                  </div>
                </div>

                <p className="text-soft-gray mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-warm-white mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="text-soft-gray text-sm flex items-start gap-2">
                        <span className="text-neon-blue mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-all duration-300 neon-glow">
                  {t.careers.apply}
                  <Send className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-soft-gray text-lg">No positions available in this department.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-medium-blue to-deep-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-warm-white mb-4">
            Don't see the right position?
          </h2>
          <p className="text-soft-gray mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and let us know how you'd like to contribute to Navilon Dev.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-cyan text-deep-blue font-semibold py-3 px-8 rounded-lg hover:scale-105 transition-all duration-300 neon-glow"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}