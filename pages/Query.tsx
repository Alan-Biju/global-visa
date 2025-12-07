
import React, { useState } from 'react';
import { Send, Mail, User, Calendar, MapPin } from 'lucide-react';
import { QueryFormData } from '../types';

const Query: React.FC = () => {
  const [formData, setFormData] = useState<QueryFormData>({
    age: '',
    email: '',
    date: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct Email Body
    const subject = `Visa Query from ${formData.email}`;
    const body = `
New Visa Query Request
----------------------
Age: ${formData.age}
Email: ${formData.email}
Target Travel Date: ${formData.date}
Address: ${formData.address}
    `.trim();

    // Encode URI for mailto
    const mailtoUrl = `mailto:support@globalvisa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Email Client
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-100/50 dark:from-slate-900/50 to-transparent pointer-events-none" />

      <div className="max-w-lg w-full relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-indigo-500/10">
          
          <div className="text-left mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Contact Us
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 text-lg font-light">
              Send us your details for a quick visa assessment.
            </p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Age Input */}
            <div className="relative group">
              <User className="absolute left-0 bottom-4 h-5 w-5 text-slate-300 dark:text-slate-600 transition-colors duration-300 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
              <input
                id="age"
                name="age"
                type="number"
                required
                min="0"
                max="120"
                className="peer w-full h-12 pl-10 border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:border-b-2 transition-all duration-300 font-medium"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              <label htmlFor="age" className="absolute left-10 top-3 text-slate-400 dark:text-slate-500 text-base transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 
                peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400
                peer-valid:-top-3.5 peer-valid:text-xs peer-valid:font-bold">
                Applicant Age
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
                Email Address
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

            <div className="pt-4">
              <button
                type="submit"
                className="group w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span>Send Request</span>
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
