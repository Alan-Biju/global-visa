
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Mail, User, Phone, Globe, CheckCircle2, X } from 'lucide-react';
import { QueryFormData } from '../types';
import SEO from '../components/SEO';

const Query: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<QueryFormData>({
    name: '',
    contact: '',
    email: '',
    destination: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (location.state && (location.state as any).destination) {
      setFormData(prev => ({
        ...prev,
        destination: (location.state as any).destination
      }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData({ name: '', contact: '', email: '', destination: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300 relative overflow-hidden">
      <SEO 
        title="Contact Visa Support - Global Visa Portal" 
        description="Have a specific question about your visa application? Contact our expert support team for personalized assistance with travel documentation to your destination."
      />
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-100/50 dark:from-slate-900/50 to-transparent pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-indigo-500/10">
          
          <div className="text-left mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Submit Your Query
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
              Our specialists will review your details and get back to you with a tailored assessment.
            </p>
          </div>
          
          <form className="space-y-7" onSubmit={handleSubmit}>
            
            {/* Full Name Input */}
            <div className="relative group">
              <User className="absolute left-0 bottom-4 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="peer w-full h-12 pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Full Name
              </label>
            </div>

            {/* Contact Email/Phone Input */}
            <div className="relative group">
              <Phone className="absolute left-0 bottom-4 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className="peer w-full h-12 pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
              />
              <label htmlFor="contact" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Contact Number
              </label>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-0 bottom-4 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="peer w-full h-12 pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Email
              </label>
            </div>

            {/* Destination Input */}
            <div className="relative group">
              <Globe className="absolute left-0 bottom-4 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <input
                id="destination"
                name="destination"
                type="text"
                required
                className="peer w-full h-12 pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
              />
              <label htmlFor="destination" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Target Destination
              </label>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="group w-full flex justify-center py-5 px-6 border border-transparent text-lg font-black rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span>Send Query</span>
                  <Send className="h-5 w-5 text-indigo-100 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Query Sent</p>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    FlyConnect will contact you soon.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseSuccess}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pb-6">
              <p className="text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                Your query has been sent successfully. Our team will contact you very soon.
              </p>
              <button
                onClick={handleCloseSuccess}
                className="mt-6 w-full inline-flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 shadow-xl shadow-indigo-500/25 transition-all active:scale-[0.99]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Query;
