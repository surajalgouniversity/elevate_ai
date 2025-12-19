import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';

function HomePage({ onApplyClick }: { onApplyClick: () => void }) {
  useGSAPAnimations();


  return (
    <div className="min-h-screen">
      <Header onApplyClick={onApplyClick} />
      <main>
        <Hero onApplyClick={onApplyClick} />
        <StatsBanner />
        <UrgencyMarquee onApplyClick={onApplyClick} />
        <SuccessStory />
        <MentorsSection />
        <ProblemSection />
        <WithWithoutSection />
        <Curriculum />
        <WhyDifferent />
        <OneStopSolution />
        <Pricing onApplyClick={onApplyClick} />
        <MentorshipInsights />
        <FAQ />
        <FinalCTA onApplyClick={onApplyClick} />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleApplyClick = () => {
    setShowApplicationModal(true);
  };

  const handleCloseModal = () => {
    setShowApplicationModal(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage onApplyClick={handleApplyClick} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <ApplicationModal isOpen={showApplicationModal} onClose={handleCloseModal} />
    </BrowserRouter>
  );
}

export default App;
