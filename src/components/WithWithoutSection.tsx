import { X, Check } from 'lucide-react';

export default function WithWithoutSection() {
  const comparisons = [
    {
      without: '8 weeks learning pandas & matplotlib basics',
      with: 'Week 1: Building real ML models that work'
    },
    {
      without: 'Jupyter notebooks that never reach production',
      with: 'Docker, FastAPI, MLOps—ship like real engineers'
    },
    {
      without: '"AI/ML" on your resume',
      with: 'Specific projects: "RAG-based legal QA, 94% BERT accuracy, deployed to AWS"'
    },
    {
      without: 'No clue how Netflix predicts series completion',
      with: 'Live problem: Solve it, then understand why—learning through experience'
    },
    {
      without: 'Confusion about transformers, fine-tuning, agents',
      with: 'Master 2025 technologies: LLMs, LoRA, QLoRA, Function Calling, MCP'
    },
    {
      without: 'No placement support or referrals',
      with: 'Direct referrals to Amazon, Google, ByteDance from alumni network'
    },
    {
      without: 'Months to deploy your first model',
      with: 'Your first AI system deployed in Week 4'
    },
    {
      without: '₹0-5 LPA roles after course',
      with: '₹20-40 LPA offers from product companies'
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/50 to-black/50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4">
          <span className="text-white">AI Engineering,</span>
          <br />
          <span className="text-[#f21028]">
            The Right Way
          </span>{' '}
          <span className="text-white">vs.</span>{' '}
          <span className="text-gray-500">
            The Wrong Way
          </span>
        </h2>

        <p className="text-gray-400 text-center mb-16 text-lg">
          See the difference between traditional courses and the Elevate approach
        </p>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500/30 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-red-400 mb-2">Without Elevate</h3>
              <p className="text-gray-400 text-sm">The traditional, outdated approach</p>
            </div>

            {comparisons.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-red-500/20 rounded-lg p-4 hover:border-red-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mt-1">
                    <X size={14} className="text-red-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.without}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#f21028]/10 to-black/50 border-2 border-[#f21028]/50 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(242,16,40,0.3)]">
              <h3 className="text-2xl font-bold text-[#f21028] mb-2">
                With Elevate
              </h3>
              <p className="text-gray-300 text-sm">The modern, production-focused approach</p>
            </div>

            {comparisons.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#f21028]/10 to-black/20 border border-[#f21028]/30 rounded-lg p-4 hover:border-[#f21028]/60 hover:shadow-[0_0_20px_rgba(242,16,40,0.2)] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f21028] flex items-center justify-center mt-1 shadow-[0_0_10px_rgba(242,16,40,0.5)]">
                    <Check size={14} className="text-white" />
                  </div>
                  <p className="text-gray-200 leading-relaxed font-medium">{item.with}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
