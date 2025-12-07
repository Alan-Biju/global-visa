
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { UserSelection } from '../types';
import { COUNTRIES_DATA } from '../constants';
import { Download, ArrowLeft, FileCheck, Info, ClipboardList, ShieldCheck, Clock, Wallet, CheckCircle2 } from 'lucide-react';

const VisaDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as UserSelection;

  // If accessed directly without state, redirect to service
  if (!state) {
    return <Navigate to="/service" replace />;
  }

  const countryData = COUNTRIES_DATA[state.destinationId];
  const visaDetails = countryData?.visa[state.visaType];

  if (!countryData || !visaDetails) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">Data not found. <Link to="/service" className="ml-2 text-indigo-600 dark:text-indigo-400 font-bold underline">Go back</Link></div>;
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header
    doc.setFontSize(24);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text("Global Visa Portal", 20, y);
    y += 10;
    
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("Official Requirements Summary", 20, y);
    y += 15;

    // Line
    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 15;

    // Profile
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Origin: ${state.originName}`, 20, y);
    doc.text(`Destination: ${state.destinationName}`, 120, y);
    y += 8;
    doc.text(`Visa Type: ${state.visaType}`, 20, y);
    doc.text(`Applicant Age: ${state.age}`, 120, y);
    y += 15;
    
    // Key Stats
    doc.setFont("helvetica", "bold");
    doc.text(`Duration: ${visaDetails.duration}`, 20, y);
    doc.text(`Est. Cost: ${visaDetails.cost}`, 120, y);
    doc.setFont("helvetica", "normal");
    y += 20;

    // Documents
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text("1. Required Documents", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(50);
    visaDetails.requirements.forEach(item => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
    });
    y += 10;

    // Process
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text("2. Application Process", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(50);
    visaDetails.process?.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item}`, 25, y);
        y += 7;
    });
    y += 10;

    // Formalities
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229);
    doc.text("3. Key Formalities", 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(50);
    visaDetails.formalities?.forEach(item => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 280);

    doc.save(`${countryData.name}_${state.visaType}_Details.pdf`);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <Link to="/service" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-4 group font-medium">
          <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Start New Assessment
        </Link>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
             {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Visa Requirement Dossier</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg flex items-center flex-wrap gap-2">
                    Route: <span className="font-bold text-slate-900 dark:text-slate-200">{state.originName}</span> <span className="text-indigo-500 px-1">✈</span> <span className="font-bold text-indigo-600 dark:text-indigo-400">{state.destinationName}</span>
                </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 px-5 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <p className="text-xs text-indigo-400 dark:text-indigo-300 font-semibold uppercase">Type</p>
                        <p className="text-indigo-700 dark:text-indigo-200 font-bold">{state.visaType} Visa</p>
                    </div>
               </div>
            </div>
        </div>

        {/* Key Information Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-600 delay-100">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Clock className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Validity Duration</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{visaDetails.duration}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Wallet className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Estimated Cost</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{visaDetails.cost}</p>
                </div>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Column 1: Required Documents */}
            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                           <ClipboardList className="h-5 w-5" />
                        </div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Required Documents</h2>
                    </div>
                    <ul className="space-y-4 flex-grow">
                        {visaDetails.requirements.map((req, i) => (
                            <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 group/item p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <CheckCircle2 className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-3 mt-0.5 shrink-0" />
                                <span className="font-medium text-sm leading-relaxed">{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Column 2: Application Process */}
            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <FileCheck className="h-5 w-5" />
                        </div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Process Timeline</h2>
                    </div>
                    <div className="space-y-0 relative flex-grow">
                        {/* Vertical Line */}
                        <div className="absolute left-5 top-2 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-700"></div>
                        
                        {visaDetails.process?.map((step, i) => (
                            <div key={i} className="relative flex gap-4 pb-8 last:pb-0 group">
                                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-500 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-110">
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

            {/* Column 3: Formalities */}
            <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                         <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                            <Info className="h-5 w-5" />
                         </div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Key Formalities</h2>
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
        <div className="flex justify-center pt-8 pb-12 animate-in fade-in zoom-in duration-500 delay-500">
            <button
            onClick={handleDownloadPDF}
            className="group w-full md:w-auto min-w-[300px] flex items-center justify-center gap-4 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl font-bold text-base transform hover:-translate-y-1"
            >
            <Download className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            Download Official Summary PDF
            </button>
        </div>

      </div>
    </div>
  );
};

export default VisaDetails;
