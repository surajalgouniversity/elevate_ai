interface UrgencyMarqueeProps {
  onApplyClick: () => void;
}

export default function UrgencyMarquee({ onApplyClick }: UrgencyMarqueeProps) {
  const companiesRow1 = [
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
    { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/2560px-Adobe_Corporate_logo.svg.png' },
    { name: 'LinkedIn', logo: 'https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg' },
    { name: 'PayPal', logo: 'https://images.seeklogo.com/logo-png/33/1/paypal-logo-png_seeklogo-336407.png' }
  ];

  const companiesRow2 = [
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' },
    { name: 'Atlassian', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Atlassian-logo.svg/1280px-Atlassian-logo.svg.png' },
    { name: 'Qualcomm', logo: 'https://www.logo.wine/a/logo/Qualcomm/Qualcomm-Logo.wine.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/960px-IBM_logo.svg.png' },
    { name: 'Walmart', logo: 'https://p7.hiclipart.com/preview/785/11/812/walmart-canada-retail-company-logo-walmart-logo.jpg' },
    { name: 'Dream11', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Dream11_Logo_2023.png' },
    { name: 'Groww', logo: 'https://resources.groww.in/web-assets/img/website-logo/groww_logo.webp' }
  ];

  return (
    <div className="space-y-6 py-8">
      <div className="bg-black/60 border border-[#f21028]/40 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <span className="text-white font-semibold text-lg">
              Next batch starts december end - limited 50 seats
            </span>
            <button onClick={onApplyClick} className="bg-[#f21028] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(242,16,40,0.6)] transition-all">
              APPLY NOW →
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-black/40 py-6">
        <div className="flex items-center gap-4 mb-6 justify-center">
          <span className="text-gray-400 text-sm font-medium">Learners now work at:</span>
        </div>
        <div className="space-y-6">
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee-fast items-center">
              {[...companiesRow1, ...companiesRow1, ...companiesRow1, ...companiesRow1].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 lg:mx-10 grayscale brightness-150 opacity-80 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all w-24 lg:w-32 h-12 flex items-center justify-center"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-10 lg:max-h-12 max-w-full object-contain"
                    style={{ filter: 'invert(1) grayscale(1) brightness(1.5)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-marquee-reverse-fast items-center">
              {[...companiesRow2, ...companiesRow2, ...companiesRow2, ...companiesRow2].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 lg:mx-10 grayscale brightness-150 opacity-80 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all w-24 lg:w-32 h-12 flex items-center justify-center"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-10 lg:max-h-12 max-w-full object-contain"
                    style={{ filter: 'invert(1) grayscale(1) brightness(1.5)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
