import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Insight {
  id: number;
  title: string;
  category: string;
  desc: string;
  videoUrl: string;
  thumbnail: string;
}

export default function MentorshipInsights() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const insights: Insight[] = [
    {
      id: 1,
      title: "The Engineering Mindset",
      category: "Leadership",
      desc: "How top engineering leaders approach problem-solving at Meta scale.",
      videoUrl: "https://www.youtube.com/shorts/JvrPpHAls4c?feature=share",
      thumbnail: "/v1.jpg"
    },
    {
      id: 2,
      title: "Learning First, Hype Last",
      category: "Career Strategy",
      desc: "Why mastering fundamentals is the only shortcut in AI.",
      videoUrl: "https://www.youtube.com/shorts/AwSAr-y39J8?feature=share",
      thumbnail: "/v2.jpg"
    },
    {
      id: 3,
      title: "The Future of AI",
      category: "Industry Vision",
      desc: "Where the landscape is heading: from research to reality.",
      videoUrl: "https://www.youtube.com/shorts/5plIqzO2fEY",
      thumbnail: "/v3.jpg"
    },
    {
      id: 4,
      title: "The Highest Paying Role",
      category: "Market Trends",
      desc: "Why AI Engineering is rapidly becoming the most valuable skill set.",
      videoUrl: "https://www.youtube.com/shorts/BP1NQTvheDA",
      thumbnail: "/v4.jpg"
    },
    {
      id: 5,
      title: "The Shift to Agentic AI",
      category: "Tech Evolution",
      desc: "How agents are replacing traditional workflows in the next era.",
      videoUrl: "https://www.youtube.com/shorts/Cv4WzmyBPCc",
      thumbnail: "/v5.jpg"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const shortMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }
    return url;
  };

  const handleCardClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-90"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Learn the Mindset of <span className="text-[#f21028]">Top 1% Engineers</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300">
            Direct insights on career, scale, and the future of AI from{' '}
            <span className="font-semibold text-white">Manohar Paluri</span>, VP of AI @ Meta
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#f21028] hover:scale-110 border border-white/20"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {insights.map((insight) => (
              <div
                key={insight.id}
                onClick={() => handleCardClick(insight.videoUrl)}
                className="flex-shrink-0 w-[280px] lg:w-[320px] snap-center cursor-pointer group/card"
              >
                <div className="relative h-[500px] lg:h-[560px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-black border border-white/10 hover:border-[#f21028]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(242,16,40,0.4)]">
                  <img
                    src={insight.thumbnail}
                    alt={insight.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  <div className="absolute top-6 left-6 right-6">
                    <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                      <span className="text-white text-sm font-medium">{insight.category}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                      {insight.title}
                    </h3>
                    <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                      {insight.desc}
                    </p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#f21028]/90 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#f21028] hover:scale-110 border border-white/20"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#f21028] animate-pulse"></div>
            <span className="text-white text-sm font-medium">
              Direct mentorship from Meta AI leadership was involved in making the program
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[500px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#f21028] transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
