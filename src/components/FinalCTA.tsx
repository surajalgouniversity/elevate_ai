import { Download } from 'lucide-react';

interface FinalCTAProps {
  onApplyClick: () => void;
}

export default function FinalCTA({ onApplyClick }: FinalCTAProps) {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-4 fade-in">
          The Question Isn't <span className="text-[#f21028]">Whether to Learn AI</span>
        </h2>
        <p className="text-gray-300 text-center mb-16 text-xl fade-in">
          Do you want to learn it the old way?{' '}
          <span className="text-gray-500">(Confusion, notebooks, never hired)</span>
          <br />
          Or the Elevate way?{' '}
          <span className="text-[#f21028]">(Real systems, shipped to production, getting ₹20-40 LPA offers)</span>
        </p>

        <div className="text-center space-y-6 scale-in">
          <button
            onClick={onApplyClick}
            className="bg-[#f21028] text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-[0_0_40px_rgba(242,16,40,0.9)] transition-all inline-block"
          >
            Get Admitted Now
          </button>
          <div className="flex justify-center">
            <a href="https://drive.google.com/file/d/1XTpi-sZaqP2xs2H4LZJ9wTeLGsne6gKd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <Download size={20} />
              <span>Download Curriculum</span>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            14-Day Trial for just ₹ 5,000 is available
          </p>
        </div>
      </div>
    </section>
  );
}
