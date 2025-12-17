import { Brain, Database, Box, Code2 } from 'lucide-react';

export default function Curriculum() {
  return (
    <section id="curriculum" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl lg:text-5xl font-bold text-white text-center mb-16 lg:mb-24 fade-in">
          What You'll Actually <span className="text-[#f21028]">Master</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">

          {/* ROW 1 - Card 1: Math & Python */}
          <div className="h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-[#f21028]/30 rounded-2xl p-6 hover:shadow-[0_0_40px_rgba(242,16,40,0.3)] transition-all group hover:border-[#f21028]/60 relative overflow-hidden flex flex-col scale-in">
            <div className="absolute top-4 right-4 bg-[#f21028]/20 text-[#f21028] px-3 py-1 rounded-full text-xs font-bold border border-[#f21028]/40">
              Weeks 1-2
            </div>
            <div className="flex items-start gap-3 mb-4 mt-8">
              <div className="w-12 h-12 bg-[#f21028] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,16,40,0.6)] flex-shrink-0">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Math & Python Foundations
              </h3>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              <span className="text-white font-semibold">NumPy, Pandas, Classical ML</span> • Logistic Regression • Decision Trees • Model Evaluation
            </p>

            <div className="bg-black/40 border border-white/10 rounded-lg p-3 mb-4">
              <div className="text-xs text-[#f21028] font-bold mb-1">PROJECT</div>
              <div className="text-sm text-white font-medium">Netflix-style Recommendation Engine</div>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">Python</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/numpy/013243" alt="NumPy" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">NumPy</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/pandas/150458" alt="Pandas" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">Pandas</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/scikitlearn/F7931E" alt="Scikit-Learn" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">Scikit-Learn</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 1 - Card 2: Neural Networks */}
          <div className="h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-[#f21028]/30 rounded-2xl p-6 hover:shadow-[0_0_40px_rgba(242,16,40,0.3)] transition-all group hover:border-[#f21028]/60 relative overflow-hidden flex flex-col scale-in">
            <div className="absolute top-4 right-4 bg-[#f21028]/20 text-[#f21028] px-3 py-1 rounded-full text-xs font-bold border border-[#f21028]/40">
              Weeks 3-4
            </div>
            <div className="flex items-start gap-3 mb-4 mt-8">
              <div className="w-12 h-12 bg-[#f21028] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,16,40,0.6)] flex-shrink-0">
                <Code2 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Neural Networks & Vision
              </h3>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              <span className="text-white font-semibold">CNNs, Vision, Audio</span> • Transfer Learning • Image Recognition • Audio Classification
            </p>

            <div className="bg-black/40 border border-white/10 rounded-lg p-3 mb-4">
              <div className="text-xs text-[#f21028] font-bold mb-1">PROJECTS</div>
              <div className="text-sm text-white font-medium">Traffic Sign Detection • Music Genre Classification</div>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/pytorch/EE4C2C" alt="PyTorch" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">PyTorch</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/tensorflow/FF6F00" alt="TensorFlow" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">TensorFlow</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/opencv/5C3EE8" alt="OpenCV" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">OpenCV</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 1 - Card 3: Transformers */}
          <div className="h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-[#f21028]/30 rounded-2xl p-6 hover:shadow-[0_0_40px_rgba(242,16,40,0.3)] transition-all group hover:border-[#f21028]/60 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 bg-[#f21028]/20 text-[#f21028] px-3 py-1 rounded-full text-xs font-bold border border-[#f21028]/40">
              Weeks 4-6
            </div>
            <div className="flex items-start gap-3 mb-4 mt-8">
              <div className="w-12 h-12 bg-[#f21028] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,16,40,0.6)] flex-shrink-0">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Transformers & NLP
              </h3>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              <span className="text-white font-semibold">BERT, GPT, Attention</span> • Fine-tuning Pre-trained Models • Hugging Face
            </p>

            <div className="bg-black/40 border border-white/10 rounded-lg p-3 mb-4">
              <div className="text-xs text-[#f21028] font-bold mb-1">PROJECTS</div>
              <div className="text-sm text-white font-medium">Toxic Comment Detector • Support Ticket Classifier</div>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/huggingface/FFD21E" alt="Hugging Face" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">Hugging Face</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-300 font-medium">Transformers</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-300 font-medium">BERT</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2 - Card 4: LLMs, RAG & Agents (HERO CARD - Spans 2 columns) */}
          <div className="md:col-span-2 h-full bg-gradient-to-br from-[#f21028]/10 via-gray-900/90 to-black/90 backdrop-blur-sm border-2 border-[#f21028]/50 rounded-2xl p-8 hover:shadow-[0_0_50px_rgba(242,16,40,0.5)] transition-all group hover:border-[#f21028] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 bg-[#f21028] text-white px-4 py-2 rounded-bl-2xl text-xs font-bold">
              ⚡ CUTTING EDGE
            </div>
            <div className="absolute top-4 left-4 bg-black/60 text-[#f21028] px-3 py-1 rounded-full text-xs font-bold border border-[#f21028]/60">
              Weeks 7-9
            </div>

            <div className="flex items-start gap-4 mb-6 mt-8">
              <div className="w-14 h-14 bg-[#f21028] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(242,16,40,0.8)] flex-shrink-0">
                <Database className="text-white" size={28} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                LLMs, RAG & AI Agents
              </h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed text-base">
              <span className="text-white font-semibold">Fine-Tuning (LoRA/QLoRA)</span> • RAG Pipelines • AI Agents • MCP Protocol
            </p>

            <div className="bg-black/40 border border-[#f21028]/40 rounded-lg p-4 mb-4">
              <div className="text-xs text-[#f21028] font-bold mb-2">REAL-WORLD PROJECTS</div>
              <div className="text-base text-white font-medium mb-2">Hospital AI Assistant & Legal Document Search</div>
            </div>

            <div className="bg-gradient-to-r from-[#f21028]/20 to-transparent border-l-4 border-[#f21028] p-4 mb-6">
              <div className="text-base text-white font-bold">Building the technologies companies hire for in 2025</div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                <img src="https://www.pinecone.io/_next/static/media/langchain.07007b3c.svg" alt="LangChain" className="w-5 h-5 bg-white rounded p-0.5" />
                <span className="text-sm text-gray-300 font-medium">LangChain</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-300 font-medium">LlamaIndex</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" className="w-5 h-5" />
                <span className="text-sm text-gray-300 font-medium">OpenAI</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                <img src="https://cdn.brandfetch.io/pinecone.io/logo/theme/dark/h/512" alt="Pinecone" className="w-5 h-5" />
                <span className="text-sm text-gray-300 font-medium">Pinecone</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-300 font-medium">Chroma</span>
              </div>
            </div>
          </div>

          {/* ROW 2 - Card 5: Deployment & MLOps */}
          <div className="h-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-[#f21028]/30 rounded-2xl p-6 hover:shadow-[0_0_40px_rgba(242,16,40,0.3)] transition-all group hover:border-[#f21028]/60 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 bg-[#f21028]/20 text-[#f21028] px-3 py-1 rounded-full text-xs font-bold border border-[#f21028]/40">
              Weeks 9-10
            </div>
            <div className="flex items-start gap-3 mb-4 mt-8">
              <div className="w-12 h-12 bg-[#f21028] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(242,16,40,0.6)] flex-shrink-0">
                <Box className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Deployment & MLOps
              </h3>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              <span className="text-white font-semibold">Docker, Cloud, Monitoring</span> • FastAPI • CI/CD • Data Drift Detection
            </p>

            <div className="bg-black/40 border border-white/10 rounded-lg p-3 mb-4">
              <div className="text-xs text-[#f21028] font-bold mb-1">FOCUS</div>
              <div className="text-sm text-white font-medium">Deploying to Cloud & Monitoring Production Systems</div>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">Docker</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://cdn.simpleicons.org/fastapi/009688" alt="FastAPI" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">FastAPI</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-300 font-medium">WandB</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-lg px-3 py-2">
                  <img src="https://www.ibexlabs.com/wp-content/uploads/2024/09/62d1345ba688202d5bfa6776_aws-sagemaker-eyecatch-e1614129391121.png" alt="AWS" className="w-5 h-5" />
                  <span className="text-sm text-gray-300 font-medium">AWS</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
