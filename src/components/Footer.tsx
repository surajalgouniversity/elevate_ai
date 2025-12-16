import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="mb-4">
              <img src="/AlgoU_yc_white.png" alt="AlgoUniversity" className="h-12" />
            </div>
            <p className="text-gray-400 text-sm">
              From Beginner to AI Engineer in 10 Weeks
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Program</h4>
            <ul className="space-y-2">
              <li>
                <a href="#results" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Results
                </a>
              </li>
              <li>
                <a href="#curriculum" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Curriculum
                </a>
              </li>
              <li>
                <a href="#mentors" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Mentors
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-[#f21028] transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:suraj@algouniversity.com"
                  className="text-gray-400 hover:text-[#f21028] transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                   admissions@algouniversity.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918096571195"
                  className="text-gray-400 hover:text-[#f21028] transition-colors text-sm flex items-center gap-2"
                >
                  <Phone size={16} />
                  +91 8790191552
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              1,200+ engineers trained. 85%+ placement rate. ₹25 LPA average.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 AlgoUniversity. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
