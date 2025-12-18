
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Navigate, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { UserSelection, VisaType } from '../types';
import { COUNTRIES_DATA } from '../constants';
import { Download, ArrowLeft, FileCheck, Info, ClipboardList, ShieldCheck, Clock, Wallet, CheckCircle2, Eye, Share2, Copy, MessageSquareText } from 'lucide-react';
import SEO from '../components/SEO';

const VisaDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [detailsState, setDetailsState] = useState<UserSelection | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize state from location.state OR query params
  useEffect(() => {
    if (location.state && (location.state as any).originId) {
      setDetailsState(location.state as UserSelection);
    } else {
      const originId = searchParams.get('origin')?.toLowerCase();
      const destinationId = searchParams.get('dest')?.toLowerCase();
      const visaTypeParam = searchParams.get('type');

      if (originId && destinationId && visaTypeParam) {
        const originCountry = COUNTRIES_DATA[originId];
        const destCountry = COUNTRIES_DATA[destinationId];
        
        // Robust check for visa type including URL-decoded values
        const decodedType = decodeURIComponent(visaTypeParam);
        const isValidType = Object.values(VisaType).includes(decodedType as VisaType);

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
  }, [location.state, searchParams]);

  const countryData = useMemo(() => 
    detailsState ? COUNTRIES_DATA[detailsState.destinationId] : null
  , [detailsState]);

  const visaDetails = useMemo(() => 
    (countryData && detailsState) ? countryData.visa[detailsState.visaType] : null
  , [countryData, detailsState]);

  // Structured Data for SEO
  const structuredData = useMemo(() => {
    if (!detailsState || !visaDetails) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Guide",
      "name": `${detailsState.visaType} Guide for ${detailsState.destinationName}`,
      "description": visaDetails.description,
      "publisher": {
        "@type": "Organization",
        "name": "Global Visa Portal"
      },
      "about": {
        "@type": "GovernmentService",
        "name": `${detailsState.visaType} Application`,
        "provider": {
          "@type": "GovernmentOrganization",
          "name": `${detailsState.destinationName} Immigration Department`
        }
      }
    };
  }, [detailsState, visaDetails]);

  if (!detailsState && !searchParams.has('origin')) {
    return <Navigate to="/service" replace />;
  }

  if (!detailsState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing Secure Dossier...</p>
      </div>
    );
  }

  if (!countryData || !visaDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 p-6 text-center">
        <ShieldCheck className="h-16 w-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Data Integrity Error</h2>
        <p className="max-w-md mb-6">We couldn't retrieve the specific visa requirements for the selected route. The destination data may be pending an update.</p>
        <Link to="/service" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-500 transition-all">
          Return to Service
        </Link>
      </div>
    );
  }

  const generatePDF = (mode: 'download' | 'view') => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(24);
    doc.setTextColor(79, 70, 229);
    doc.text("Global Visa Portal", 20, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("Visa Requirement Dossier", 20, y);
    y += 15;

    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 15;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Origin: ${detailsState.originName}`, 20, y);
    doc.text(`Destination: ${detailsState.destinationName}`, 120, y);
    y += 8;
    doc.text(`Visa Category: ${detailsState.visaType}`, 20, y);
    y += 15;
    
    doc.setFont("helvetica", "bold");
    doc.text(`Duration: ${visaDetails.duration}`, 20, y);
    doc.text(`Est. Cost: ${visaDetails.cost}`, 120, y);
    doc.setFont("helvetica", "normal");
    y += 20;

    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text("1. Required Documents", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(50);
    visaDetails.requirements.forEach(item => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`• ${item}`, 25, y);
        y += 7;
    });
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text("2. Application Process", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(50);
    visaDetails.process?.forEach((item, idx) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${idx + 1}. ${item}`, 25, y);
        y += 7;
    });
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text("3. Key Formalities", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(50);
    visaDetails.formalities?.forEach(item => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`• ${item}`, 25, y);
        y += 7;
    });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 280);
    doc.text(`Portal Link: ${window.location.href}`, 20, 285);

    if (mode === 'download') {
      doc.save(`${countryData.name}_${detailsState.visaType}_Dossier.pdf`);
    } else {
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${detailsState.visaType} for ${detailsState.destinationName}`,
        text: `Check out the full visa requirements and process for ${detailsState.destinationName} on the Global Visa Portal.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSendQuery = () => {
    navigate('/query', { state: { destination: detailsState.destinationName } });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <SEO 
        title={`${detailsState.visaType} for ${detailsState.destinationName} - Global Visa Portal`}
        description={`Complete dossier of requirements, estimated costs (${visaDetails.cost}), and processing timelines for ${detailsState.visaType} applicants from ${detailsState.originName} traveling to ${detailsState.destinationName}.`}
        structuredData={structuredData || undefined}
      />
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link to="/service" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group font-semibold">
            <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Assessment
          </Link>
          <button 
            onClick={handleShare}
            className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl border ${copySuccess ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
          >
            {copySuccess ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copySuccess ? 'Link Copied!' : 'Share Dossier'}
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Visa Requirement Dossier</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg flex items-center flex-wrap gap-2">
                    Route: <span className="font-bold text-slate-900 dark:text-slate-200">{detailsState.originName}</span> <span className="text-indigo-500 px-1">✈</span> <span className="font-bold text-indigo-600 dark:text-indigo-400">{detailsState.destinationName}</span>
                </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 px-5 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <p className="text-xs text-indigo-400 dark:text-indigo-300 font-semibold uppercase">Category</p>
                        <p className="text-indigo-700 dark:text-indigo-200 font-bold">{detailsState.visaType}</p>
                    </div>
               </div>
            </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-600 delay-100">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Clock className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Standard Validity</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{visaDetails.duration}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Wallet className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Estimated Application Fee</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{visaDetails.cost}</p>
                </div>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                           <ClipboardList className="h-5 w-5" />
                        </div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Required Documents</h2>
                    </div>
                    <ul className="space-y-4 flex-grow">
                        {visaDetails.requirements.map((req, i) => (
                            <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <CheckCircle2 className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-3 mt-0.5 shrink-0" />
                                <span className="font-medium text-sm leading-relaxed">{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <FileCheck className="h-5 w-5" />
                        </div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Process Steps</h2>
                    </div>
                    <div className="space-y-0 relative flex-grow">
                        <div className="absolute left-5 top-2 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-700"></div>
                        {visaDetails.process?.map((step, i) => (
                            <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-500 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
                                    {i + 1}
                                </div>
                                <div className="pt-1">
                                    <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm leading-snug">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                         <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                            <Info className="h-5 w-5" />
                         </div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Post-Entry Formalities</h2>
                    </div>
                     <ul className="space-y-3 flex-grow">
                        {visaDetails.formalities?.map((item, i) => (
                            <li key={i} className="text-slate-600 dark:text-slate-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 p-4 rounded-xl text-sm font-medium leading-relaxed">
                                {item}
                            </li>
                        ))}
                    </ul>
                 </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 animate-in fade-in zoom-in duration-500 delay-500">
            <button
              onClick={() => generatePDF('view')}
              className="group w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-400 px-6 py-4 rounded-xl transition-all shadow-md hover:shadow-xl font-bold text-base transform hover:-translate-y-1"
            >
             <Eye className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
             View Dossier (PDF)
            </button>
            <button
              onClick={() => generatePDF('download')}
              className="group w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-3 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl font-bold text-base transform hover:-translate-y-1"
            >
              <Download className="h-5 w-5" />
              Download Full Summary
            </button>
        </div>

        {/* Query Section */}
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-black mb-4 tracking-tight">Still confused about {detailsState.destinationName} requirements?</h2>
              <p className="text-indigo-100 text-lg">
                Our immigration experts are ready to help you navigate specific complexities of your {detailsState.visaType} application.
              </p>
            </div>
            <button
              onClick={handleSendQuery}
              className="flex-shrink-0 flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-50 transition-all hover:scale-105"
            >
              <MessageSquareText className="h-6 w-6" />
              Send Query
            </button>
          </div>
        </div>
        <div className="pb-12" />
      </div>
    </div>
  );
};

export default VisaDetails;
