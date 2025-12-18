
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Mail, User, Calendar, MapPin, Phone, Globe } from 'lucide-react';
import { QueryFormData } from '../types';
import SEO from '../components/SEO';

const Query: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<QueryFormData>({
    name: '',
    contact: '',
    destination: '',
    date: '',
    address: ''
  });

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
    
    // Construct Email Body
    const subject = `Visa Query from ${formData.name}`;
    const body = `
New Visa Query Request
----------------------
Name: ${formData.name}
Contact Info: ${formData.contact}
Destination Point: ${formData.destination}
Target Travel Date: ${formData.date}
Current Residence: ${formData.address}
    `.trim();

    // Encode URI for mailto
    const mailtoUrl = `mailto:support@globalvisa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Email Client
    window.location.href = mailtoUrl;
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
                placeholder="Email or Phone"
                value={formData.contact}
                onChange={handleChange}
              />
              <label htmlFor="contact" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Email or Phone Number
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

            {/* Date Input */}
            <div className="relative group">
              <Calendar className="absolute left-0 bottom-4 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <input
                id="date"
                name="date"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                required
                className="peer w-full h-12 pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange}
              />
              <label htmlFor="date" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Target Travel Date
              </label>
            </div>

            {/* Address Input */}
            <div className="relative group">
              <MapPin className="absolute left-0 top-3 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <textarea
                id="address"
                name="address"
                required
                rows={2}
                className="peer w-full pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium py-2 leading-relaxed resize-none"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="address" className="absolute left-10 top-2 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Current Residence
              </label>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="group w-full flex justify-center py-5 px-6 border border-transparent text-lg font-black rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span>Send Query Protocol</span>
                  <Send className="h-5 w-5 text-indigo-100 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Query;
