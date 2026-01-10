import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Map as MapIcon, Shield, ChevronLeft, ChevronRight, Play, Navigation, Star } from 'lucide-react';
import { generateHeroImage } from '../services/geminiService';
import { COUNTRIES_DATA } from '../constants';
import SEO from '../components/SEO';

const features = [
  { 
    icon: MapIcon, 
    title: "Global Database", 
    desc: "Access up-to-date requirements for major destinations worldwide including updated consulate processing times." 
  },
  { 
    icon: CheckCircle2, 
    title: "Instant Assessment", 
    desc: "Get immediate feedback on visa categories based on your specific profile and origin country." 
  },
  { 
    icon: Shield, 
    title: "Verified Information", 
    desc: "Data curated from official immigration sources ensuring you have the correct document lists." 
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  
  // Timer reference to handle auto-play resets
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoadingImage(true);
      const generated = await generateHeroImage();
      if (generated) {
        setHeroImage(generated);
      } else {
        setHeroImage("https://picsum.photos/id/48/1200/800"); 
      }
      setLoadingImage(false);
    };
    fetchImage();
  }, []);

  // Robust slider timer logic
  const startTimer = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const nextSlide = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
    startTimer(); // Reset timer on manual interaction
  };

  const prevSlide = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
    startTimer(); // Reset timer on manual interaction
  };

  const goToSlide = (index: number) => {
    setCurrentFeature(index);
    startTimer(); // Reset timer on manual interaction
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    const el = testimonialsRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const handleCountryClick = (countryId: string) => {
    navigate('/service', { state: { preselectedDestination: countryId } });
  };

  return (
    <div className="flex flex-col">
      <SEO 
        title="Global Visa Portal - Instant Visa Requirements & Eligibility"
        description="Find visa requirements for any country instantly. We simplify the complex world of travel documentation for tourism, work, and student visas."
      />
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden" aria-label="Hero Section">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Global Visa Portal</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Find visa requirements for any country instantly. We simplify the complex world of travel documentation so you can focus on the journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/service" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
                aria-label="Start Visa Assessment"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 aspect-video group">
                {loadingImage ? (
                  <div className="absolute inset-0 flex items-center justify-center text-indigo-400">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                  </div>
                ) : (
                  <img 
                    src={heroImage || ""} 
                    alt="Abstract Future Travel Visualization" 
                    className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white opacity-80 text-sm font-mono">
                  AI Generated Visualization
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Video Background Section */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center bg-slate-900" aria-label="Introduction Video">
        <div className="absolute inset-0 w-full h-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="object-cover w-full h-full opacity-60"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-plane-flying-above-clouds-11910-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-indigo-900/20 to-slate-900/80" />
        </div>
        
        <div className="relative z-20 text-center text-white px-4 max-w-5xl animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Play className="h-4 w-4 fill-white" />
            <span className="text-sm font-medium">Watch the process</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-xl">
            Travel Without Boundaries
          </h2>
          <p className="text-xl md:text-2xl text-slate-100 font-light max-w-3xl mx-auto drop-shadow-lg">
            Our automated systems scan global immigration databases in real-time to ensure you never miss a document.
          </p>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden" aria-label="Interactive Map">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 to-slate-900 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Explore Destinations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Hover over our active regions to see status or click to start your visa application instantly.
            </p>
          </div>

          <div className="relative w-full aspect-[16/9] bg-slate-800/50 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden group">
            {/* Map Background */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
              alt="World Map Interface" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 invert brightness-50 contrast-125"
            />
            
            {/* Map Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

            {/* Interactive Points */}
            {Object.entries(COUNTRIES_DATA).map(([key, country]) => (
              country.coordinates && (
                <div 
                  key={key}
                  className="absolute"
                  style={{ top: `${country.coordinates.top}%`, left: `${country.coordinates.left}%` }}
                >
                  <button
                    onClick={() => handleCountryClick(key)}
                    className="relative group/point flex items-center justify-center"
                    aria-label={`View requirements for ${country.name}`}
                  >
                    {/* Pulsing Beacon */}
                    <span className="absolute inline-flex h-4 w-4 rounded-full bg-indigo-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-white/20 shadow-[0_0_10px_rgba(99,102,241,0.6)]"></span>

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover/point:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/point:translate-y-0 pointer-events-none z-20">
                      <div className="bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700 shadow-2xl text-center">
                        <p className="font-bold text-lg mb-1">{country.name}</p>
                        <div className="flex items-center justify-center gap-1 text-xs text-indigo-400">
                          <span>View Requirements</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900/90 absolute left-1/2 -translate-x-1/2 -bottom-1.5"></div>
                    </div>
                  </button>
                </div>
              )
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-4 text-sm text-slate-500">
               <div className="flex items-center gap-2">
                 <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                 <span>Active Regions</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-3 h-3 bg-slate-700 rounded-full"></span>
                 <span>Coming Soon</span>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Carousel Section */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-t border-slate-100 dark:border-slate-800" aria-label="Features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Use Our Portal?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Advanced tools for the modern traveler.</p>
          </div>
          
          <div className="relative max-w-5xl mx-auto group">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 h-[450px] md:h-[400px] relative">
              
              {/* Slider Track */}
              <div 
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentFeature * 100}%)` }}
              >
                {features.map((feature, idx) => (
                   <div key={idx} className="w-full min-w-full h-full flex-shrink-0 flex items-center justify-center p-8 md:p-16">
                      <article className="flex flex-col items-center text-center max-w-lg group cursor-default">
                        <div className="p-6 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl mb-8 transition-all duration-300 shadow-inner group-hover:shadow-xl group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/70 group-hover:-translate-y-2">
                          <feature.icon className="h-16 w-16 text-indigo-600 dark:text-indigo-400 transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{feature.title}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                      </article>
                   </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <button 
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur shadow-lg hover:bg-white dark:hover:bg-slate-600 text-slate-900 dark:text-white transition-all hover:scale-110 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextSlide} 
                aria-label="Next slide"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur shadow-lg hover:bg-white dark:hover:bg-slate-600 text-slate-900 dark:text-white transition-all hover:scale-110 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      idx === currentFeature 
                        ? 'bg-indigo-600 dark:bg-indigo-400 w-8 shadow-md shadow-indigo-500/50' 
                        : 'bg-slate-300 dark:bg-slate-600 w-3 hover:bg-indigo-300'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300" aria-label="Happy Customers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Happy Customers</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Real reviews from customers who chose FlyConnect.</p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollTestimonials('left')}
              aria-label="Previous reviews"
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollTestimonials('right')}
              aria-label="Next reviews"
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={testimonialsRef}
              className="-mx-4 px-4 flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory scroll-px-4 pb-2 sm:mx-0 sm:px-0"
            >
              {[
              {
                name: 'Priya S.',
                title: 'Tourist Visa Support',
                review:
                  'Very smooth process. FlyConnect guided me through the document checklist clearly and answered all my questions quickly.',
              },
              {
                name: 'Rohit K.',
                title: 'Work Permit Assistance',
                review:
                  'Professional and responsive. I got the requirements in simple language and the submission guidance was spot on.',
              },
              {
                name: 'Ananya M.',
                title: 'Student Visa Guidance',
                review:
                  'Fast support and easy to understand steps. The checklist downloads were helpful and saved me a lot of time.',
              },
              {
                name: 'Sanjay R.',
                title: 'Family Visit Visa',
                review:
                  'The team explained everything in a simple way and kept following up until my documents were ready. Highly recommended.',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="snap-center shrink-0 w-[calc(100%-2rem)] sm:w-[420px] md:w-[360px] bg-white/90 dark:bg-slate-900/60 backdrop-blur rounded-3xl border border-slate-200 dark:border-slate-800 p-7 sm:p-8 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">“{t.review}”</p>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="font-black text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.title}</p>
                </div>
              </div>
            ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
              <button
                onClick={() => scrollTestimonials('left')}
                aria-label="Previous reviews"
                className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-lg active:scale-95 transition-transform"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTestimonials('right')}
                aria-label="Next reviews"
                className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-lg active:scale-95 transition-transform"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Anchor */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Need Expert Assistance?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
            Our team is available 24/7 to help you with complex migration queries and custom document verification.
          </p>
          <Link to="/query" className="inline-block px-8 py-4 bg-white dark:bg-slate-800 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all shadow-xl hover:shadow-2xl">
            Submit a Detailed Query
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;