import { Check, X } from 'lucide-react';

interface PricingProps {
  onApplyClick: () => void;
}

export default function Pricing({ onApplyClick }: PricingProps) {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4 fade-in">
          Investment in Your ₹20-40 LPA Career
        </h2>
        <p className="text-gray-400 text-center mb-16 text-lg fade-in">
          Choose the path that fits your commitment level.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          <div className="bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-8 hover:border-gray-500/60 transition-all opacity-90 flex flex-col h-full scale-in">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">14-Day Trial</h3>
              <div className="inline-block bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                Non-Refundable
              </div>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold text-white mb-1">₹5,000</div>
              <div className="text-gray-500 text-sm">One-time</div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Live Classes</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <X size={20} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-500">Production-Ready Portfolio</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <X size={20} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-500">1:1 Mentorship</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <X size={20} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-500">Placement Support</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <X size={20} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-500">Lifetime Access</span>
              </li>
            </ul>

            <button
              onClick={onApplyClick}
              className="w-full border-2 border-gray-600 text-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-800/30 hover:border-gray-500 transition-all"
            >
              Start Trial
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-8 hover:border-white/50 transition-all flex flex-col h-full scale-in">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Monthly EMI</h3>
              <div className="text-gray-400 text-sm mb-4">For 3 Months</div>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold text-white mb-1">₹15,000</div>
              <div className="text-gray-400 text-sm">/ month</div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">10 Weeks Intensive Training</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Live Classes with FAANG Mentors</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Production-Ready Portfolio</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">1:1 Mentorship & Placement</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Lifetime Access & Community</span>
              </li>
            </ul>

            <button
              onClick={onApplyClick}
              className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all text-lg"
            >
              Enroll via EMI
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#FF0033]/15 via-gray-900/90 to-black/90 backdrop-blur-sm border-2 border-[#FF0033] rounded-2xl p-8 hover:border-[#FF0033] transition-all relative shadow-[0_0_60px_rgba(255,0,51,0.4)] md:scale-105 flex flex-col h-full scale-in">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF0033] text-white px-6 py-2 rounded-full font-bold shadow-[0_0_30px_rgba(255,0,51,0.8)] text-sm">
              SAVE 50%
            </div>

            <div className="mb-6 mt-2">
              <h3 className="text-2xl font-bold text-white mb-2">Pay Upfront</h3>
              <div className="inline-block bg-[#FF0033]/20 text-[#FF0033] px-3 py-1 rounded-full text-xs font-bold border border-[#FF0033]/40 mb-4">
                RECOMMENDED
              </div>
            </div>

            <div className="mb-8">
              <div className="text-gray-500 line-through text-xl mb-2">₹60,000</div>
              <div className="text-5xl font-bold text-[#FF0033] mb-1 drop-shadow-[0_0_30px_rgba(255,0,51,0.8)]">
                ₹30,000
              </div>
              <div className="text-gray-300 text-sm">One-time payment. Best Value.</div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-white font-semibold">Everything in EMI Plan</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-white font-semibold">Priority Support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-white font-semibold">Maximum Savings (₹15k saved vs EMI)</span>
              </li>
            </ul>

            <button
              onClick={onApplyClick}
              className="w-full bg-[#FF0033] text-white py-4 rounded-lg font-bold hover:shadow-[0_0_40px_rgba(255,0,51,0.9)] transition-all text-lg animate-pulse"
            >
              Secure Spot Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
