import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import UrgencyMarquee from './components/UrgencyMarquee';
import SuccessStory from './components/SuccessStory';
import MentorsSection from './components/MentorsSection';
import ProblemSection from './components/ProblemSection';
import WithWithoutSection from './components/WithWithoutSection';
import Curriculum from './components/Curriculum';
import WhyDifferent from './components/WhyDifferent';
import OneStopSolution from './components/OneStopSolution';
import Pricing from './components/Pricing';
import MentorshipInsights from './components/MentorshipInsights';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';

function App() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  useGSAPAnimations();

  const handleApplyClick = () => {
    setShowApplicationModal(true);
  };

  const handleCloseModal = () => {
    setShowApplicationModal(false);
  };

  return (
    <div className="min-h-screen">
      <Header onApplyClick={handleApplyClick} />
      <main>
        <Hero onApplyClick={handleApplyClick} />
        <StatsBanner />
        <UrgencyMarquee onApplyClick={handleApplyClick} />
        <SuccessStory />
        <MentorsSection />
        <ProblemSection />
        <WithWithoutSection />
        <Curriculum />
        <WhyDifferent />
        <OneStopSolution />
        <Pricing onApplyClick={handleApplyClick} />
        <MentorshipInsights />
        <FAQ />
        <FinalCTA onApplyClick={handleApplyClick} />
      </main>
      <Footer />
      <ApplicationModal isOpen={showApplicationModal} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
