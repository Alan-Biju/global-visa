import React, { useState } from 'react';
import { doc, setDoc, writeBatch, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { COUNTRIES_DATA } from '../constants';

const AdminSeed: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleSeed = async () => {
        if (!window.confirm("Are you sure you want to overwrite database data with constants.ts data?")) return;

        setLoading(true);
        setStatus('Starting seed...');

        try {
            const batch = writeBatch(db);

            let count = 0;
            for (const [key, countryData] of Object.entries(COUNTRIES_DATA)) {
                const docRef = doc(db, 'countries', key);
                batch.set(docRef, countryData);
                count++;
            }

            await batch.commit();
            setStatus(`Successfully seeded ${count} countries to Firestore!`);
        } catch (error: any) {
            console.error("Error seeding data:", error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-slate-800">Database Seeder</h1>
                <p className="mb-6 text-slate-600">
                    This tool will upload data from local <code>constants.ts</code> to your Firestore <code>countries</code> collection.
                </p>

                {status && (
                    <div className={`mb-6 p-4 rounded-lg ${status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {status}
                    </div>
                )}

                <button
                    onClick={handleSeed}
                    disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Seeding...' : 'Seed Database'}
                </button>
            </div>
        </div>
    );
};

export default AdminSeed;
