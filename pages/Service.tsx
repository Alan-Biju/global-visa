
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { COUNTRIES_DATA } from '../constants';
import { VisaType } from '../types';
import { ChevronDown, Plane, Briefcase, GraduationCap, ArrowRight, MapPin, Globe } from 'lucide-react';

const Service: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form State
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [age, setAge] = useState<string>('');
  
  const [selectedOriginName, setSelectedOriginName] = useState<string>('Select Origin');
  const [selectedDestName, setSelectedDestName] = useState<string>('Select Destination');
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'origin' | 'destination' | null>(null);
  const [showTypeModal, setShowTypeModal] = useState(false);

  // Check for pre-selected destination from Home Map
  useEffect(() => {
    if (location.state && location.state.preselectedDestination) {
      const destKey = location.state.preselectedDestination;
      const countryData = COUNTRIES_DATA[destKey];
      if (countryData) {
        setDestination(destKey);
        setSelectedDestName(countryData.name);
        // If we have a destination but no origin, suggest opening origin modal or just let user click
        // Setting activeModal('origin') might be too aggressive on load, let user decide.
      }
    }
  }, [location.state]);

  // Validation Check to trigger Type Modal
  useEffect(() => {
    if (origin && destination && age && parseInt(age) > 0) {
      // Small delay for UX smoothness
      const timer = setTimeout(() => setShowTypeModal(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowTypeModal(false);
    }
  }, [origin, destination, age]);

  const handleSelection = (key: string, name: string) => {
    if (activeModal === 'origin') {
        setOrigin(key);
        setSelectedOriginName(name);
        // Reset destination if it matches origin (optional, keeping simple for now)
    } else if (activeModal === 'destination') {
        setDestination(key);
        setSelectedDestName(name);
    }
    setActiveModal(null);
  };

  const handleTypeSelect = (type: VisaType) => {
    navigate('/details', {
      state: {
        originId: origin,
        originName: selectedOriginName,
        destinationId: destination,
        destinationName: selectedDestName,
        age: parseInt(age),
        visaType: type
      }
    });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-xl mb-6">
            <Globe className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Visa Eligibility Assessment
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Configure your journey details below to initialize the requirement scanning protocol.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 space-y-8">
          
          {/* Origin Input */}
          <div className="space-y-3 group">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">From (Origin)</label>
            <button
              onClick={() => setActiveModal('origin')}
              className="w-full flex justify-between items-center px-6 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-left text-slate-900 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all bg-white dark:bg-slate-700/50 hover:bg-indigo-50 dark:hover:bg-slate-700 group-hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <MapPin className="h-6 w-6" />
                 </div>
                 <span className={`text-lg ${origin ? 'font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                    {selectedOriginName}
                 </span>
              </div>
              <ChevronDown className="h-6 w-6 text-slate-400 transition-transform group-hover:rotate-180" />
            </button>
          </div>

          {/* Destination Input */}
          <div className="space-y-3 group">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">To (Destination)</label>
            <button
              onClick={() => setActiveModal('destination')}
              disabled={!origin}
              className={`w-full flex justify-between items-center px-6 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-left text-slate-900 dark:text-white transition-all bg-white dark:bg-slate-700/50 ${!origin ? 'opacity-50 cursor-not-allowed' : 'hover:border-pink-500 dark:hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-slate-700 focus:ring-4 focus:ring-pink-500/20 group-hover:shadow-lg'}`}
            >
               <div className="flex items-center gap-4">
                 <div className={`p-2 rounded-lg ${!origin ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400'}`}>
                    <MapPin className="h-6 w-6" />
                 </div>
                 <span className={`text-lg ${destination ? 'font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                    {selectedDestName}
                 </span>
               </div>
              <ChevronDown className="h-6 w-6 text-slate-400 transition-transform group-hover:rotate-180" />
            </button>
          </div>

          {/* Age Input */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Applicant Age</label>
            <div className="relative">
                <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                min="0"
                max="120"
                disabled={!destination}
                className="w-full px-6 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-white transition-all outline-none disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-lg font-medium placeholder:text-slate-400"
                />
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
             <span>* Mandatory Fields</span>
             <span>Step 1 of 2</span>
          </div>
        </div>
      </div>

      {/* Country Selection Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                 Select {activeModal === 'origin' ? 'Origin' : 'Destination'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
                Close
              </button>
            </div>
            <div className="overflow-y-auto p-2 no-scrollbar bg-white dark:bg-slate-800">
              {Object.entries(COUNTRIES_DATA).map(([key, country]) => (
                <button
                  key={key}
                  disabled={activeModal === 'destination' && key === origin}
                  onClick={() => handleSelection(key, country.name)}
                  className="w-full text-left px-5 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all flex items-center justify-between group disabled:opacity-30 disabled:cursor-not-allowed border-b border-slate-50 dark:border-slate-700 last:border-0"
                >
                  <span className="font-semibold text-lg text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{country.name}</span>
                  {(activeModal === 'origin' ? origin === key : destination === key) && 
                    <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-lg shadow-indigo-500/50"></div>
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visa Type Selection Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-10 fade-in duration-300 border border-slate-200 dark:border-slate-700">
            <div className="p-8 text-center border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Select Purpose</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Scanning protocols active for route: <br/>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedOriginName}</span> <span className="text-slate-300 px-2">➝</span> <span className="font-bold text-pink-600 dark:text-pink-400">{selectedDestName}</span>
              </p>
            </div>
            
            <div className="p-8 grid gap-4 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => handleTypeSelect(VisaType.Tourism)}
                className="flex items-center p-5 bg-white dark:bg-slate-800 border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                  <Plane className="h-7 w-7" />
                </div>
                <div className="ml-5 text-left">
                  <span className="block text-lg font-bold text-slate-900 dark:text-white">Tourism</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Leisure, Visiting Friends</span>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => handleTypeSelect(VisaType.Work)}
                className="flex items-center p-5 bg-white dark:bg-slate-800 border-2 border-transparent hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                  <Briefcase className="h-7 w-7" />
                </div>
                <div className="ml-5 text-left">
                  <span className="block text-lg font-bold text-slate-900 dark:text-white">Work</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Employment, Long-term</span>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => handleTypeSelect(VisaType.Student)}
                className="flex items-center p-5 bg-white dark:bg-slate-800 border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div className="ml-5 text-left">
                  <span className="block text-lg font-bold text-slate-900 dark:text-white">Student</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">University, Education</span>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-300 dark:text-slate-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-950 p-4 text-center">
              <button 
                onClick={() => setShowTypeModal(false)}
                className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline font-medium"
              >
                Cancel / Modify Inputs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
