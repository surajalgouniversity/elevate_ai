export default function StatsBanner() {
  const stats = [
    { number: '1380+', label: 'Learners Placed' },
    { number: '41 LPA', label: 'Highest CTC' },
    { number: '22 LPA', label: 'AVG CTC' },
    { number: '110%', label: 'AVG Hike' }
  ];

  return (
    <section id="results" className="py-12 bg-gradient-to-r from-black/80 via-[#f21028]/10 to-black/80 border-y border-[#f21028]/30 shadow-[0_0_50px_rgba(242,16,40,0.3)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center ${
                index < stats.length - 1 ? 'lg:border-r border-white/20' : ''
              }`}
            >
              <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f21028] mb-2 drop-shadow-[0_0_15px_rgba(242,16,40,0.8)]">
                {stat.number}
              </div>
              <div className="text-white text-sm lg:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
