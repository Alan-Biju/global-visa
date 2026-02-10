
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Navigate, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { UserSelection, VisaType } from '../types';
import { GLOBAL_DRIVE_URL } from '../constants';
import { useCountries } from '../hooks/useCountries';
import {
  Download, ArrowLeft, Info, ClipboardList, ShieldAlert,
  Clock, CheckCircle2, Share2, MessageSquareText,
  FileText, Camera, ExternalLink, ListChecks, Globe
} from 'lucide-react';
import SEO from '../components/SEO';

const VisaDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: countriesData, loading: countriesLoading } = useCountries();
  const [detailsState, setDetailsState] = useState<UserSelection | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'requirements' | 'photos' | 'downloads' | 'formalities'>('requirements');

  useEffect(() => {
    if (countriesLoading) return;

    if (location.state && (location.state as any).originId) {
      setDetailsState(location.state as UserSelection);
    } else {
      const originId = searchParams.get('origin')?.toLowerCase();
      const destinationId = searchParams.get('dest')?.toLowerCase();
      const visaTypeParam = searchParams.get('type');

      if (originId && destinationId && visaTypeParam) {
        const originCountry = countriesData[originId];
        const destCountry = countriesData[destinationId];
        const decodedType = decodeURIComponent(visaTypeParam);
        const isValidType = destCountry && !!destCountry.visa[decodedType];

        if (originCountry && destCountry && isValidType) {
          setDetailsState({
            originId,
            originName: originCountry.name,
            destinationId,
            destinationName: destCountry.name,
            visaType: decodedType as VisaType
          });
        }
      }
    }
  }, [location.state, searchParams, countriesLoading, countriesData]);

  const countryData = useMemo(() =>
    (detailsState && !countriesLoading) ? countriesData[detailsState.destinationId] : null
    , [detailsState, countriesLoading, countriesData]);

  const visaDetails = useMemo(() =>
    (countryData && detailsState) ? countryData.visa[detailsState.visaType] : null
    , [countryData, detailsState]);

  const isEVisa = useMemo(() => {
    if (!detailsState) return false;
    const type = detailsState.visaType.toLowerCase();
    return type.includes('e-visa') || type.includes('e visa');
  }, [detailsState]);

  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'requirements', label: 'Requirements', icon: ClipboardList },
      { id: 'photos', label: 'Photo Specs', icon: Camera },
      { id: 'downloads', label: 'Downloads', icon: Download },
      { id: 'formalities', label: 'Formalities', icon: Info },
    ] as const;

    if (isEVisa) {
      return baseTabs.filter(t => t.id !== 'requirements');
    }
    return baseTabs;
  }, [isEVisa]);

  useEffect(() => {
    if (isEVisa && activeTab === 'requirements') {
      setActiveTab('photos');
    }
  }, [isEVisa, activeTab]);

  if (countriesLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing Secure Dossier...</p>
      </div>
    );
  }

  if (!detailsState && !searchParams.has('origin')) return <Navigate to="/service" replace />;

  if (!detailsState || !countryData || !visaDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p className="text-slate-500 font-medium">Data not found. Please try again.</p>
        <Link to="/service" className="mt-4 text-indigo-600 font-bold hover:underline">Return to Assessment</Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${detailsState.visaType} for ${detailsState.destinationName}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };


  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <SEO
        title={`${detailsState.visaType} to ${detailsState.destinationName} - Flyconnect`}
        description={`Full checklist and requirements for ${detailsState.visaType} for ${detailsState.destinationName}.`}
      />
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Nav & Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link to="/service" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-bold group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Assessment
          </Link>
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Share2 className="h-4 w-4" />
            {copySuccess ? 'Copied!' : 'Share'}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter tracking-tight">Requirement Dossier</h1>
            <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2">
              {detailsState.originName} <span className="text-indigo-500">➝</span> {detailsState.destinationName}
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 min-w-[140px]">
              <p className="text-[10px] font-black uppercase text-emerald-400">Cost</p>
              <button
                onClick={() => navigate('/query', { state: { destination: countryData.name } })}
                className="mt-1 bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Query
              </button>
            </div>
          </div>
        </div>

        {/* E-Visa Special Header Notification */}
        {isEVisa && (
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Info className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">Instant E-Visa Protocol</h3>
                <p className="text-indigo-100 font-bold">Contact our administrator for the comprehensive digital application dossier.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/query', { state: { destination: countryData.name } })}
              className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg hover:-translate-y-1"
            >
              Contact Owner
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Dynamic Tab Switcher */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-5 font-black text-sm transition-all whitespace-nowrap border-b-4 ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 min-h-[400px]">
            {activeTab === 'requirements' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black flex items-center gap-2 tracking-tight">
                    <ClipboardList className="h-6 w-6 text-indigo-600" />
                    Primary Documentation Protocol
                  </h2>


                </div>
                <div className="grid gap-4">
                  {visaDetails.requirements.map((req, i) => (
                    <div key={i} className="flex gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0 group">
                      <div className="text-indigo-600 font-black text-sm shrink-0 mt-1">
                        {i + 1}.
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{req}</p>
                    </div>
                  ))}
                </div>

                {!!(visaDetails.checklists || []).length && (
                  <div className="mt-10">
                    <h3 className="text-lg font-black mb-4 tracking-tight flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-indigo-600" />
                      Official Submission Checklists
                    </h3>
                    <p className="text-slate-500 mb-6 font-medium">Select and download the specific verified checklist required for your case submission:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(visaDetails.checklists || []).map((item, i) => (
                        <a key={i} href={item.url} target="_blank" rel="noopener" className="flex items-center gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group bg-white dark:bg-slate-800 shadow-sm">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg group-hover:bg-red-100 transition-colors">
                            <FileText className="h-6 w-6 text-red-500" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600">{item.label}</span>
                          <Download className="h-4 w-4 ml-auto text-slate-300 group-hover:text-indigo-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}


            {activeTab === 'photos' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl text-indigo-600 dark:text-indigo-400">
                      <Camera className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">Biometric Photo Specifications</h2>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-inner space-y-8">
                    <p className="text-slate-700 dark:text-slate-300 font-bold text-xl leading-relaxed italic border-l-4 border-indigo-500 pl-6">
                      "{visaDetails.photoSpecs || 'Standard passport photo requirements apply.'}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-1">Dimensions</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">35mm x 45mm</p>
                        <p className="text-xs text-slate-500 mt-2 font-bold">Industry standard for global visa scanning.</p>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-1">Background</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">Plain White</p>
                        <p className="text-xs text-slate-500 mt-2 font-bold">Strictly no patterns, shadows, or gradients.</p>
                      </div>
                    </div>

                    <div className="text-slate-500 text-sm font-bold flex items-center gap-2">
                      <Info className="h-4 w-4 text-indigo-500" />
                      Photos must not be older than 6 months.
                    </div>
                  </div>
                </div>
              </div>

            )}

            {activeTab === 'downloads' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black tracking-tight">Manuals & Regulatory Downloads</h2>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest">
                    <ShieldAlert className="h-3 w-3" />
                    Verified Protocols
                  </div>
                </div>

                <div className="grid gap-6">
                  {(visaDetails.downloads || [])
                    .filter((item) => {
                      const label = (item.label || '').toLowerCase();
                      const url = (item.url || '').toLowerCase();
                      return !label.includes('vfs') && !url.includes('vfs');
                    })
                    .map((item, i) => {
                      const isMain = i === 0 && !item.isExternal;
                      return (
                        <a
                          key={i}
                          href={item.url}
                          target="_blank"
                          rel="noopener"
                          className={`flex items-center justify-between p-8 rounded-3xl group transition-all border-2 ${isMain
                            ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-500 hover:shadow-2xl'
                            } shadow-sm`}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl ${isMain
                              ? 'bg-white dark:bg-slate-800 group-hover:bg-white/20'
                              : 'bg-slate-50 dark:bg-slate-900'
                              } transition-colors`}>
                              {item.isExternal ? (
                                <Globe className={`h-10 w-10 ${isMain ? 'text-indigo-600 group-hover:text-white' : 'text-indigo-600'}`} />
                              ) : (
                                <FileText className={`h-10 w-10 ${isMain ? 'text-indigo-600 group-hover:text-white' : 'text-indigo-600'}`} />
                              )}
                            </div>
                            <div>
                              <p className="font-black text-xl tracking-tight">{item.label}</p>
                              <p className={`text-sm font-bold ${isMain ? 'opacity-60' : 'text-slate-500'}`}>
                                {item.description || (item.isExternal ? 'Official government portal redirect' : 'Complete step-by-step instruction manual')}
                              </p>
                            </div>
                          </div>
                          {item.isExternal ? (
                            <ExternalLink className={`h-8 w-8 ${isMain ? 'opacity-40 group-hover:opacity-100' : 'text-slate-300 group-hover:text-indigo-600'} transition-all`} />
                          ) : (
                            <Download className={`h-8 w-8 ${isMain ? 'opacity-40 group-hover:opacity-100' : 'text-slate-300 group-hover:text-indigo-600'} transition-all`} />
                          )}
                        </a>
                      );
                    })}
                </div>

                {/* Generic fallback items if no specific downloads exist, or extra regulatory declarations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                  {(countryData?.files || []).map((file, i) => (
                    <a key={`country-file-${i}`} href={file.url} target="_blank" className="flex items-center gap-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all font-black text-sm uppercase tracking-tight text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 group shadow-sm">
                      <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      {file.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'formalities' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-black mb-10 tracking-tight">Mandatory Post-Entry Formalities</h2>
                <div className="grid gap-6">
                  {(countryData.formalities || []).map((item, i) => (
                    <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 font-bold text-lg text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global CTA */}
        <div className="bg-slate-900 dark:bg-indigo-950 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden border border-slate-800 dark:border-indigo-900 group">
          <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] transition-all group-hover:bg-indigo-500/30"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Need Profile Review?</h2>
              <p className="text-indigo-200 text-xl font-bold leading-relaxed">
                If your documentation is non-standard or you require executive consular handling, our experts at <span className="text-white">Flyconnect</span> are ready to initialize a custom submission protocol.
              </p>
            </div>
            <button
              onClick={() => navigate('/query', { state: { destination: countryData.name } })}
              className="shrink-0 flex items-center gap-4 bg-white text-indigo-600 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 group/btn"
            >
              <MessageSquareText className="h-7 w-7 transition-transform group-hover/btn:rotate-12" />
              Initialize Support
            </button>
          </div>
        </div>
      </div >
      <div className="pb-32"></div>
    </div >
  );
};

export default VisaDetails;
