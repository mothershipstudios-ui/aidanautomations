'use client';

interface Problem {
  icon: string;
  title: string;
  description: string;
}

const problems: Problem[] = [
  {
    icon: '⏱️',
    title: 'Wasted Time on Manual Work',
    description:
      'Your team spends hours on repetitive tasks that could be automated. That\'s time not spent growing your business or serving customers.',
  },
  {
    icon: '💰',
    title: 'Losing Revenue Opportunities',
    description:
      'Manual processes slow you down. Customers move to faster competitors. Automation keeps you in the race.',
  },
  {
    icon: '😤',
    title: 'Team Burnout & Errors',
    description:
      'Repetitive work is boring and error-prone. Automation eliminates drudgery, freeing your team to do meaningful work.',
  },
];

export default function Problems() {
  return (
    <section id="problems" className="section-padding bg-white">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            The Problem with Manual Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you\'re still doing things manually, you\'re losing time, money, and your team\'s enthusiasm.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="feature-card hover:border-cyan transition-colors duration-300"
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
