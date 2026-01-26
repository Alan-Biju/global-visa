
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';
import { VisaType, CountryData } from '../types';
import { ChevronDown, Plane, Briefcase, GraduationCap, ArrowRight, MapPin, Globe, Clock, Newspaper, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';

const Service: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: countriesData, loading: countriesLoading } = useCountries();

  // Form State
  const [origin, setOrigin] = useState<string>('india');
  const [destination, setDestination] = useState<string>('');
  const [visaType, setVisaType] = useState<VisaType | null>(null);

  const [selectedOriginName, setSelectedOriginName] = useState<string>('India');
  const [selectedDestName, setSelectedDestName] = useState<string>('Select Destination');

  // Modal State
  const [activeModal, setActiveModal] = useState<'origin' | 'destination' | 'type' | null>(null);

  // Update default origin name when data loads
  useEffect(() => {
    if (!countriesLoading && countriesData['india'] && origin === 'india') {
      setSelectedOriginName(countriesData['india'].name);
    }
  }, [countriesLoading, countriesData, origin]);

  // Check for pre-selected destination from Home Map
  useEffect(() => {
    if (!countriesLoading && location.state && location.state.preselectedDestination) {
      const destKey = location.state.preselectedDestination;
      const countryData = countriesData[destKey];
      if (countryData) {
        setDestination(destKey);
        setSelectedDestName(countryData.name);
      }
    }
  }, [location.state, countriesLoading, countriesData]);

  const handleSelection = (key: string, name: string) => {
    if (activeModal === 'origin') {
      setOrigin(key);
      setSelectedOriginName(name);
    } else if (activeModal === 'destination') {
      setDestination(key);
      setSelectedDestName(name);
    }
    setActiveModal(null);
  };

  const handleTypeSelect = (type: VisaType) => {
    setVisaType(type);
    setActiveModal(null);
  };

  const handleSubmit = () => {
    if (origin && destination && visaType) {
      navigate(`/details?origin=${origin}&dest=${destination}&type=${visaType}`, {
        state: {
          originId: origin,
          originName: selectedOriginName,
          destinationId: destination,
          destinationName: selectedDestName,
          visaType: visaType
        }
      });
    }
  };

  const canSubmit = origin && destination && visaType;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      <SEO
        title="Visa Eligibility Assessment - Global Visa Portal"
        description="Check your eligibility for Short Term, Long Term, Work Permit, Student, or Journalist visas. Select your origin and destination to get started."
      />

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
              disabled={countriesLoading}
              className="w-full flex justify-between items-center px-6 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-left text-slate-900 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all bg-white dark:bg-slate-700/50 hover:bg-indigo-50 dark:hover:bg-slate-700 group-hover:shadow-lg disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <span className={`text-lg ${origin ? 'font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                  {countriesLoading ? 'Loading...' : selectedOriginName}
                </span>
              </div>
              {countriesLoading ? <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent"></div> : <ChevronDown className="h-6 w-6 text-slate-400 transition-transform group-hover:rotate-180" />}
            </button>
          </div>

          {/* Destination Input */}
          <div className="space-y-3 group">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">To (Destination)</label>
            <button
              onClick={() => setActiveModal('destination')}
              disabled={!origin || countriesLoading}
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

          {/* Visa Type Input */}
          <div className="space-y-3 group">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Visa Category</label>
            <button
              onClick={() => setActiveModal('type')}
              disabled={!destination}
              className={`w-full flex justify-between items-center px-6 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-left text-slate-900 dark:text-white transition-all bg-white dark:bg-slate-700/50 ${!destination ? 'opacity-50 cursor-not-allowed' : 'hover:border-violet-500 dark:hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-slate-700 focus:ring-4 focus:ring-violet-500/20 group-hover:shadow-lg'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${!destination ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400'}`}>
                  {visaType === VisaType.Student ? <GraduationCap className="h-6 w-6" /> : visaType === VisaType.WorkPermit ? <Briefcase className="h-6 w-6" /> : visaType === VisaType.Journalist ? <Newspaper className="h-6 w-6" /> : visaType === VisaType.LongTerm ? <Clock className="h-6 w-6" /> : <Plane className="h-6 w-6" />}
                </div>
                <span className={`text-lg ${visaType ? 'font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                  {visaType || 'Select Visa Type'}
                </span>
              </div>
              <ChevronDown className="h-6 w-6 text-slate-400 transition-transform group-hover:rotate-180" />
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full py-5 rounded-2xl text-lg font-black tracking-tight transition-all flex items-center justify-center gap-3 shadow-xl ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:-translate-y-1 shadow-indigo-500/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
            >
              Initialize Search Protocol
              <ArrowRight className={`h-6 w-6 ${canSubmit ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Origin/Destination Selection Modal */}
      {(activeModal === 'origin' || activeModal === 'destination') && (
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
              {countriesLoading ? (
                <div className="p-8 text-center text-slate-500">Loading countries...</div>
              ) : (
                Object.entries(countriesData).map(([key, country]) => (
                  <button
                    key={key}
                    disabled={activeModal === 'destination' && key === origin}
                    onClick={() => handleSelection(key, (country as CountryData).name)}
                    className="w-full text-left px-5 py-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all flex items-center justify-between group disabled:opacity-30 disabled:cursor-not-allowed border-b border-slate-50 dark:border-slate-700 last:border-0"
                  >
                    <span className="font-semibold text-lg text-slate-700 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{(country as CountryData).name}</span>
                    {(activeModal === 'origin' ? origin === key : destination === key) &&
                      <div className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-lg shadow-indigo-500/50"></div>
                    }
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Visa Type Selection Modal */}
      {activeModal === 'type' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-10 fade-in duration-300 border border-slate-200 dark:border-slate-700">
            <div className="p-8 text-center border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Select Visa Category</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Scanning protocols active for route: <br />
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedOriginName}</span> <span className="text-slate-300 px-2">➝</span> <span className="font-bold text-pink-600 dark:text-pink-400">{selectedDestName}</span>
              </p>
            </div>


            <div className="p-8 grid gap-4 bg-slate-50 dark:bg-slate-900 overflow-y-auto max-h-[60vh] no-scrollbar">
              {destination && countriesData[destination] ? (
                Object.keys(countriesData[destination].visa).map((typeKey) => {
                  const type = typeKey as VisaType;

                  // Helper to get styling based on type (or fallback)
                  let icon = Plane;
                  let color = "blue";
                  let sub = "Custom Visa Category";

                  if (type === VisaType.ShortTerm) {
                    icon = Plane; color = "blue"; sub = "Tourism, Family, Business (90 Days)";
                  } else if (type === VisaType.LongTerm) {
                    icon = Clock; color = "indigo"; sub = "Residence, Extended Stay";
                  } else if (type === VisaType.WorkPermit) {
                    icon = Briefcase; color = "emerald"; sub = "Employment, Specialized Skills";
                  } else if (type === VisaType.Student) {
                    icon = GraduationCap; color = "violet"; sub = "Academic Studies, Research";
                  } else if (type === VisaType.Journalist) {
                    icon = Newspaper; color = "amber"; sub = "Press & Media Assignments";
                  }

                  return (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className={`flex items-center p-5 bg-white dark:bg-slate-800 border-2 ${visaType === type ? 'border-indigo-600' : 'border-transparent'} hover:border-indigo-500 rounded-2xl shadow-sm hover:shadow-xl transition-all group`}
                    >
                      <div className={`p-4 rounded-xl group-hover:scale-110 transition-transform bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`}>
                        {React.createElement(icon, { className: "h-7 w-7" })}
                      </div>
                      <div className="ml-5 text-left">
                        <span className="block text-lg font-bold text-slate-900 dark:text-white">{type}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{sub}</span>
                      </div>
                      <ArrowRight className="ml-auto h-6 w-6 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="text-center p-8 text-slate-500">
                  Please select a destination to view available visa types.
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
              <button onClick={() => setActiveModal(null)} className="w-full py-3 text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
