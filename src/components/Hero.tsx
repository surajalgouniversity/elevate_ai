import { Download } from 'lucide-react';

interface HeroProps {
  onApplyClick: () => void;
}

export default function Hero({ onApplyClick }: HeroProps) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 -z-10"
      >
        <source src="https://d1lrk9cp1c3gxw.cloudfront.net/static/nurture/images/optimized/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight fade-in">
            <span className="text-white">
              Build AI Systems,
            </span>
            <br />
            <span className="text-white">Get Hired,</span>
            <br />
            <span className="text-[#f21028]">
              Levelup
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto fade-in">
            Master AI Engineering in 10 weeks, with live mentorship from{' '}
            <span className="text-[#f21028] font-semibold">FAANG engineers</span>. Build{' '}
            <span className="text-white font-semibold">production ready AI Systems</span> that
            companies look for, not toy projects that sit in jupyter notebooks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <button
              onClick={onApplyClick}
              className="bg-[#f21028] text-white px-10 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(242,16,40,0.8)] transition-all text-lg"
            >
              Enroll in next batch
            </button>
            <a href="https://drive.google.com/file/d/1XTpi-sZaqP2xs2H4LZJ9wTeLGsne6gKd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-lg flex items-center justify-center gap-2">
              <Download size={20} />
              Download Curriculum
            </a>
          </div>

          <p className="text-gray-400 text-base lg:text-lg">
            Designed for working professionals & college students |{' '}
            <span className="text-[#f21028] font-semibold">Backed by Y-Combinator</span>
          </p>

          <div className="pt-8">
            <p className="text-gray-300 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Master the full life cycle of AI Engineers - LLMs, RAG agents deployment, MLOps by
              building realworld AI Projects & Products not jupyter notebook projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
