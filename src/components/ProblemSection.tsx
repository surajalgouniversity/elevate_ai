import { X } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    "You're stuck maintaining models others built",
    "You memorise pandas and matplotlib for 8 weeks, then forget it",
    'Your resume stays "learning AI" for years',
    'Companies see you as a junior, not an engineer ready for 20-40 LPA roles',
    'You watch chatbots get built while you struggle with jupyter notebook',
    'Your Competition learned RAG, Fine-tuning, and LLMs while you\'re still on basics'
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4 fade-in">
          The AI Gold Rush is here
        </h2>
        <p className="text-xl lg:text-2xl text-gray-400 text-center mb-16 fade-in">
          (why most AI Engineers <span className="text-[#f21028]">Fail</span>)
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex gap-4 items-start slide-in-left">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f21028]/20 border border-[#f21028] flex items-center justify-center mt-1">
                  <X size={14} className="text-[#f21028]" />
                </div>
                <p className="text-gray-300 text-lg">{problem}</p>
              </div>
            ))}
          </div>

          <div className="relative slide-in-right">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Jupyter Notebook Hell</h3>
                <p className="text-gray-400 text-sm">Where most AI learners get stuck</p>
              </div>

              <div className="relative h-64 bg-black/60 rounded-lg border border-white/10 p-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-4 border-[#f21028]/30 rounded-full"></div>
                    <div className="absolute inset-2 border-4 border-[#f21028]/50 rounded-full"></div>
                    <div className="absolute inset-4 border-4 border-[#f21028] rounded-full animate-pulse"></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-16 bg-gray-700 rounded-lg border-2 border-gray-600">
                      <div className="absolute inset-2 flex flex-col justify-between">
                        <div className="h-1 bg-gray-500 rounded"></div>
                        <div className="h-1 bg-gray-500 rounded"></div>
                        <div className="h-1 bg-gray-500 rounded"></div>
                      </div>
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#f21028] rounded-full flex items-center justify-center">
                        <X size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 space-y-2">
                  <div className="bg-green-500/20 border border-green-500 rounded px-2 py-1 text-xs text-green-400">
                    Production Ready
                  </div>
                  <div className="text-xs text-gray-500">← The Goal</div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f21028]/20 to-transparent flex items-end justify-center pb-2">
                  <p className="text-[#f21028] text-xs font-semibold">Error: Module not found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
