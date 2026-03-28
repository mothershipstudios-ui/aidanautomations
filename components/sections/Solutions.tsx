'use client';

interface UseCase {
  industry: string;
  problem: string;
  solution: string;
}

const useCases: UseCase[] = [
  {
    industry: '🏘️ Real Estate',
    problem: 'Manual CRM data entry, follow-up scheduling',
    solution: 'Automated lead capture, instant notifications, CRM sync',
  },
  {
    industry: '🛒 E-Commerce',
    problem: 'Order fulfillment, inventory checks, customer emails',
    solution: 'Smart workflows for orders, stock levels, personalized emails',
  },
  {
    industry: '📢 Marketing',
    problem: 'Social scheduling, email campaigns, contact management',
    solution: 'Automated posting, segmented email, lead scoring',
  },
  {
    industry: '📊 Consulting',
    problem: 'Report generation, client communication, scheduling',
    solution: 'Auto-generated reports, templated comms, calendar syncing',
  },
];

export default function Solutions() {
  return (
    <section className="section-padding bg-gray-bg">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            How Automation Works for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Smart automation means your business runs while you sleep. No more manual bottlenecks.
          </p>
        </div>

        {/* Solution Statement */}
        <div className="bg-white rounded-lg p-8 md:p-12 mb-12 border-l-4 border-primary">
          <h3 className="text-2xl font-bold text-primary-dark mb-4">The Automation Advantage</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold mt-1">✓</span>
              <span><strong>Speed:</strong> Tasks that took hours now take minutes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold mt-1">✓</span>
              <span><strong>Accuracy:</strong> Eliminate human error from routine work</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold mt-1">✓</span>
              <span><strong>Scale:</strong> Do 10x more work without 10x more people</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-lg font-bold mt-1">✓</span>
              <span><strong>Focus:</strong> Free your team to do meaningful, creative work</span>
            </li>
          </ul>
        </div>

        {/* Industries */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-primary-dark mb-6">Industries We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors">
                <h4 className="text-lg font-bold text-primary mb-2">{useCase.industry}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Problem:</strong> {useCase.problem}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Solution:</strong> {useCase.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
