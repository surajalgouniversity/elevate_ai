import { Trophy, MapPin, Crown, Play, X } from 'lucide-react';
import { useState } from 'react';

export default function SuccessStory() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handlePlayClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
  };

  return (
    <section id="mentors" className="py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-black via-[#0B1120] to-black border border-[#f21028]/30 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_rgba(242,16,40,0.2)]">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-block">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1.5 rounded-full text-xs lg:text-sm font-bold tracking-wide">
                  GLOBAL RANK #1
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  History Made at NeurIPS.
                </h2>
                <p className="text-xl lg:text-2xl text-white font-semibold">
                  The first Indian team to win the Meta Hacker Cup (AI Track).
                </p>
                <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                  While others watched the livestream, our students were on stage presenting their Generative AI research to the world's top scientists.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-white font-semibold text-sm lg:text-base">1st Indian Team</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-white font-semibold text-sm lg:text-base">Vancouver, Canada</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-white font-semibold text-sm lg:text-base">World Rank #1</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-video shadow-[0_0_30px_rgba(242,16,40,0.3)] cursor-pointer group" onClick={handlePlayClick}>
                <img
                  src="https://img.youtube.com/vi/orOVhgwyUfA/maxresdefault.jpg"
                  alt="Meta Hackercup Winners at NeurIPS"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <button
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-[#f21028] to-[#ff4444] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(242,16,40,0.6)]"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white fill-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
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
              src="https://www.youtube-nocookie.com/embed/orOVhgwyUfA?autoplay=1&rel=0"
              title="Meta Hackercup Winners at NeurIPS Annual Research Conference."
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
