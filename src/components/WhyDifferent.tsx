import { Rocket, Zap, Package, Briefcase, Users, Play, X } from 'lucide-react';
import { useState } from 'react';

export default function WhyDifferent() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handlePlayClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
  };

  const cards = [
    {
      icon: Rocket,
      title: '1. Learn AI from 2025, Not 2020',
      description:
        'No outdated pandas tutorials. Learn Transformers, RAG, LLM Agents, and Fine-tuning - the tech stack companies are hiring for right now.'
    },
    {
      icon: Zap,
      title: '2. Fail Forward, Learn Faster',
      description:
        'Build broken systems, fix them, understand why. This is how senior engineers learned - through real experience, not perfect tutorials.'
    },
    {
      icon: Package,
      title: '3. Ship, Don\'t Just Code',
      description:
        'Every project goes live. Learn Docker, FastAPI, AWS, and MLOps - the production skills that separate engineers from students.'
    },
    {
      icon: Briefcase,
      title: '4. Portfolio That Gets Interviews',
      description:
        'Not another MNIST classifier. Build: RAG systems for real documents, Fine-tuned models for business use, Production APIs that scale.'
    },
    {
      icon: Users,
      title: '5. Apprenticeship, Not Lectures',
      description:
        'Live mentorship from FAANG engineers who built production AI systems. Code reviews, architecture decisions, career guidance.'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-12 lg:mb-16 fade-in">
          Why Elevate is <span className="text-[#f21028]">Different</span>
        </h2>

        <div className="max-w-5xl mx-auto mb-16 lg:mb-24 scale-in">
          <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-video shadow-[0_0_30px_rgba(242,16,40,0.3)] cursor-pointer group" onClick={handlePlayClick}>
            <img
              src="https://img.youtube.com/vi/mCGEOYzRalQ/maxresdefault.jpg"
              alt="Why we started AlgoUniversity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <button
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-r from-[#f21028] to-[#ff4444] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(242,16,40,0.6)]"
                aria-label="Play video"
              >
                <Play className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-white ml-1" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="text-center px-4">
              <div className="text-white font-bold text-lg mb-1">Swapnil Daga</div>
              <div className="text-gray-400 text-sm">Ex-Apple, Google London • IIIT Hyderabad Alumni</div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-black/80 to-gray-900/80 border border-white/10 rounded-xl p-6 lg:p-8 hover:border-[#f21028] hover:shadow-[0_0_30px_rgba(242,16,40,0.3)] transition-all group scale-in"
              >
                <div className="w-14 h-14 bg-[#f21028] rounded-lg flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(242,16,40,0.6)] group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={handleCloseModal}>
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-[#f21028] transition-colors"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube-nocookie.com/embed/mCGEOYzRalQ?autoplay=1&rel=0"
             
              title="Why Elevate is Different?"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
