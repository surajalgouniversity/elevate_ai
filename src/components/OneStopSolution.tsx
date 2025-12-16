import { Check, Play, X } from 'lucide-react';
import { useState } from 'react';

export default function OneStopSolution() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handlePlayClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
  };
  const leftItems = [
    'Real Curriculum',
    'Live Classes',
    'Fail Forward',
    'Deployed Projects',
    '1:1 Mentorship'
  ];

  const rightItems = [
    'Portfolio Building',
    'Dedicated Placement Cell',
    'Job-Ready Resume',
    'Lifetime Access'
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-16 lg:mb-24">
          Everything You Need to Become an <span className="text-[#f21028]">AI Engineer</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            {leftItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f21028] flex items-center justify-center shadow-[0_0_15px_rgba(242,16,40,0.6)]">
                  <Check size={18} className="text-white" />
                </div>
                <span className="text-white text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f21028]/20 to-transparent rounded-2xl blur-2xl"></div>
              <div className="relative z-10 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/20 p-6 shadow-2xl">
                <div className="flex flex-col h-full">
                  <div className="bg-[#f21028]/20 border border-[#f21028] rounded-lg p-3 mb-4">
                    <div className="text-white font-bold text-lg mb-2">AI Engineer Checklist</div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={14} className="text-[#f21028]" />
                          <div className="h-2 bg-white/20 rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex items-end justify-center">
                    <div className="w-16 h-24 bg-[#f21028] rounded-t-lg relative">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-16 border-2 border-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {rightItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f21028] flex items-center justify-center shadow-[0_0_15px_rgba(242,16,40,0.6)]">
                  <Check size={18} className="text-white" />
                </div>
                <span className="text-white text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="max-w-5xl mx-auto mt-16 lg:mt-24">
          <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-video shadow-[0_0_30px_rgba(242,16,40,0.3)] cursor-pointer group" onClick={handlePlayClick}>
            <img
              src="https://img.youtube.com/vi/xXGtB9DKgSM/maxresdefault.jpg"
              alt="Become a Production-Ready AI Engineer"
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

          <div className="mt-4 text-center">
            <div className="text-white font-bold text-lg mb-1">Complete 10-Week Curriculum Walkthrough</div>
            <div className="text-gray-400 text-sm">Learn what you'll master in the Elevate Program</div>
          </div>
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
              src="https://www.youtube-nocookie.com/embed/xXGtB9DKgSM?autoplay=1&rel=0"
              title="Become a Production-Ready AI Engineer in 10 Weeks"
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
