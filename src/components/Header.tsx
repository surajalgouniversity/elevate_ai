import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onApplyClick: () => void;
}

export default function Header({ onApplyClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-[#f21028]/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center flex-shrink-0">
            <img src="/AlgoU_yc_white.png" alt="AlgoUniversity" className="h-12 sm:h-14 lg:h-16" />
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#results" className="text-gray-300 hover:text-[#f21028] transition-colors font-medium">
              Results
            </a>
            <a href="#curriculum" className="text-gray-300 hover:text-[#f21028] transition-colors font-medium">
              Curriculum
            </a>
            <a href="#mentors" className="text-gray-300 hover:text-[#f21028] transition-colors font-medium">
              Mentors
            </a>
            <a href="https://www.algouniversity.com/events/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#f21028] transition-colors font-medium">
              Events
            </a>
          </div>

          <button onClick={onApplyClick} className="hidden lg:block bg-[#f21028] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(242,16,40,0.6)] transition-all">
            APPLY NOW →
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white flex-shrink-0 p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-4">
            <a href="#results" className="block text-gray-300 hover:text-[#f21028] transition-colors">
              Results
            </a>
            <a href="#curriculum" className="block text-gray-300 hover:text-[#f21028] transition-colors">
              Curriculum
            </a>
            <a href="#mentors" className="block text-gray-300 hover:text-[#f21028] transition-colors">
              Mentors
            </a>
            <a href="https://www.algouniversity.com/events/" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-[#f21028] transition-colors">
              Events
            </a>
            <button onClick={onApplyClick} className="w-full bg-[#f21028] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(242,16,40,0.6)] transition-all">
              APPLY NOW →
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
