import { Linkedin, BarChart, Star, GraduationCap, Sparkles, Award, Trophy } from 'lucide-react';

interface Badge {
  icon: React.ReactNode;
  text: string;
}

interface ExperienceLogo {
  name: string;
  url: string;
}

interface Mentor {
  name: string;
  role: string;
  achievementBadges: Badge[];
  experienceLogos: ExperienceLogo[];
  description: string;
  linkedinUrl: string;
  avatarUrl: string;
}

const mentors: Mentor[] = [
  {
    name: "Manas Kumar Verma",
    role: "Founder & CEO",
    achievementBadges: [
      { icon: <BarChart className="w-3 h-3" />, text: "Yellow @ Codeforces" },
      { icon: <GraduationCap className="w-3 h-3" />, text: "IIIT Hyderabad" }
    ],
    experienceLogos: [
      { name: "Directi", url: "https://d1lrk9cp1c3gxw.cloudfront.net/static/leap/companies/directi.png" },
      { name: "AlphaGrep", url: "https://d1lrk9cp1c3gxw.cloudfront.net/static/leap/companies/alphagrep.png" }
    ],
    description: "Envisioned AlgoUniversity and brought some of most talented folks under one roof.",
    linkedinUrl: "https://www.linkedin.com/in/thenextmkv/",
    avatarUrl: "/manas copy.png"
  },
  {
    name: "Swapnil Daga",
    role: "Co-Founder & COO",
    achievementBadges: [
      { icon: <Star className="w-3 h-3" />, text: "6* on CodeChef" },
      { icon: <GraduationCap className="w-3 h-3" />, text: "IIIT Hyderabad" }
    ],
    experienceLogos: [
      { name: "Google", url: "https://d1lrk9cp1c3gxw.cloudfront.net/static/leap/companies/google.png" },
      { name: "Apple", url: "https://d1lrk9cp1c3gxw.cloudfront.net/static/leap/companies/apple.png" }
    ],
    description: "3 years as Interview coach for Tech. The man behind Teaching Infrastructure.",
    linkedinUrl: "https://www.linkedin.com/in/swapnil-daga1/",
    avatarUrl: "/swapnil copy.png"
  },
  {
    name: "Nipun Goyal",
    role: "AI Engineer at Microsoft R&D",
    achievementBadges: [
      { icon: <GraduationCap className="w-3 h-3" />, text: "IIITH-Alumni" },
      { icon: <Sparkles className="w-3 h-3" />, text: "AI/ML A* Publications" }
    ],
    experienceLogos: [
      { name: "Microsoft", url: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png" }
    ],
    description: "Guided 1000+ students in Software & AI. Experienced AI Engineer at Microsoft R&D.",
    linkedinUrl: "https://www.linkedin.com/in/nipun-goyal-770117216/",
    avatarUrl: "/nipun_new.png"
  },
  {
    name: "Nikita Agarwal",
    role: "Head of AI at AlgoUniversity",
    achievementBadges: [
      { icon: <Trophy className="w-3 h-3" />, text: "Meta HackerCup Winner" },
      { icon: <GraduationCap className="w-3 h-3" />, text: "IIITH CS" }
    ],
    experienceLogos: [
      { name: "Microsoft", url: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png" },
      { name: "Indeed", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Indeed_logo.png" }
    ],
    description: "World #1 at Facebook AI HackerCup. Ex-Microsoft AI Researcher. Creator of breakthrough code-gen & reasoning AI.",
    linkedinUrl: "https://www.linkedin.com/in/nikita-agawal-iiith/",
    avatarUrl: "/nikita.png"
  }
];

export default function MentorsSection() {
  return (
    <section id="mentors" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Meet your{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Mentors
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="relative overflow-hidden p-6 flex flex-row items-start justify-between min-h-[260px] bg-[#0F172A] border border-white/10 rounded-2xl shadow-lg hover:border-[#f21028] transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,16,40,0.2)]"
            >
              <div className="flex flex-col w-[65%] z-20 relative">
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
                  {mentor.name}
                </h3>
                <p className="text-blue-400 font-semibold text-sm mb-3">{mentor.role}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {mentor.achievementBadges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className="inline-flex items-center gap-1 bg-yellow-200 text-yellow-900 px-2 py-1 rounded text-xs font-bold w-fit"
                    >
                      {badge.icon}
                      {badge.text}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {mentor.experienceLogos.map((logo, logoIndex) => (
                    <div
                      key={logoIndex}
                      className="bg-white p-1 rounded h-8 flex items-center justify-center"
                    >
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="h-6 w-auto object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-gray-800 text-xs font-bold px-2">${logo.name}</span>`;
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {mentor.description}
                </p>

                <a
                  href={mentor.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors w-fit mt-auto"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>

              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="absolute bottom-0 right-0 h-[220px] w-auto object-contain z-10 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
