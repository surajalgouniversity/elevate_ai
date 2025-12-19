import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Who is this program for?',
      answer:
        'This program is designed for working professionals and college students who want to transition into AI engineering roles. Whether you have a basic programming background or are looking to upskill from traditional software roles, this course will take you from fundamentals to production-ready AI systems.'
    },
    {
      question: 'What are the prerequisites?',
      answer:
        'Basic programming knowledge in any language is recommended. We start with Python fundamentals, so if you can write basic code and understand loops and functions, you\'re ready to start. No prior AI or ML experience required.'
    },
    {
      question: 'How much time do I need to commit?',
      answer:
        '5 hours per week over 10 weeks. This includes live classes (3-4 hours/week), hands-on projects, and mentorship sessions. The program is designed for working professionals, with weekend sessions and flexible project timelines.'
    },
    {
      question: 'Do you guarantee job placement?',
      answer:
        'We provide dedicated placement support including resume building, interview prep, and direct company referrals. While we don\'t guarantee placement (no ethical program can), 85%+ of our learners land AI roles within 6 months of completion with an average CTC of 22 LPA.'
    },
    {
      question: 'What tools and technologies will I learn?',
      answer:
        'You\'ll master the modern AI stack: Python, PyTorch, Transformers, LangChain, Vector Databases, RAG systems, FastAPI, Docker, AWS, and MLOps tools. Everything needed to build and deploy production AI systems in 2025.'
    },
    {
      question: 'How is this different from other AI courses?',
      answer:
        'Most courses teach outdated theory. We focus on production skills: you\'ll build real systems, deploy them live, and learn from FAANG engineers. Every project goes from localhost to production, teaching you Docker, APIs, and cloud deployment - not just Jupyter notebooks.'
    },
    {
      question: 'What happens after I complete the program?',
      answer:
        'You get lifetime access to all course materials, community, and updates. Our placement cell actively works with you for 12 months post-completion. You\'ll have a portfolio of deployed projects and continued mentorship access for career guidance.'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-16 lg:mb-24 fade-in">
          <span className="text-[#f21028]">FAQ</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl overflow-hidden hover:border-[#f21028]/50 transition-all scale-in"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-white font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={`text-[#f21028] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
