import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { VisaType, CountryData, VisaCategoryDetails, CountryFile, ChecklistItem, DownloadItem } from '../types';
import { Trash2, Plus, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_FORMALITIES = [
    'Immigration check upon arrival',
    'Local police reporting within 14 days of entry',
    'Register at nearest Foreigners Regional Registration Office (FRRO)',
    'Carry printed visa approval and travel documents at all times'
];

const DEFAULT_VISA_DETAILS: VisaCategoryDetails = {
    description: '',
    requirements: [''],
    checklists: [],
    downloads: [],
    photoSpecs: '',
    files: [],
    formalities: [...DEFAULT_FORMALITIES]
};

const AdminCountryForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    // Country Fields
    const [countryId, setCountryId] = useState(''); // Document ID (slug)
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [top, setTop] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);
    const [files, setFiles] = useState<CountryFile[]>([]);
    const [countryFormalities, setCountryFormalities] = useState<string[]>(['']);

    // Visa Data
    const [visaData, setVisaData] = useState<Record<string, VisaCategoryDetails>>({});
    const [selectedVisaType, setSelectedVisaType] = useState<VisaType | ''>('');

    const handleAddVisaType = () => {
        if (!selectedVisaType) return;
        if (visaData[selectedVisaType]) {
            alert("This visa type already exists for this country.");
            return;
        }
        setVisaData({
            ...visaData,
            [selectedVisaType]: { ...DEFAULT_VISA_DETAILS }
        });
        setSelectedVisaType('');
    };

    const handleAddFile = () => {
        setFiles([...files, { name: '', url: '' }]);
    };

    const updateFile = (index: number, field: keyof CountryFile, value: string) => {
        const newFiles = [...files];
        newFiles[index] = { ...newFiles[index], [field]: value };
        setFiles(newFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleRemoveVisaType = (type: string) => {
        const newData = { ...visaData };
        delete newData[type];
        setVisaData(newData);
    };

    const updateVisaDetail = (type: string, field: keyof VisaCategoryDetails, value: any) => {
        setVisaData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    const updateArrayField = (type: string, field: 'requirements', index: number, value: string) => {
        const list = [...(visaData[type][field] || [])];
        list[index] = value;
        updateVisaDetail(type, field, list);
    };

    const addArrayItem = (type: string, field: 'requirements') => {
        const list = [...(visaData[type][field] || [])];
        list.push('');
        updateVisaDetail(type, field, list);
    };

    const removeArrayItem = (type: string, field: 'requirements', index: number) => {
        const list = [...(visaData[type][field] || [])];
        list.splice(index, 1);
        updateVisaDetail(type, field, list);
    };

    // Per-visa-type files helpers
    const addVisaFile = (type: string) => {
        const currentFiles = visaData[type].files || [];
        updateVisaDetail(type, 'files', [...currentFiles, { name: '', url: '' }]);
    };

    const updateVisaFile = (type: string, index: number, field: keyof CountryFile, value: string) => {
        const currentFiles = [...(visaData[type].files || [])];
        currentFiles[index] = { ...currentFiles[index], [field]: value };
        updateVisaDetail(type, 'files', currentFiles);
    };

    const removeVisaFile = (type: string, index: number) => {
        const currentFiles = [...(visaData[type].files || [])];
        currentFiles.splice(index, 1);
        updateVisaDetail(type, 'files', currentFiles);
    };

    // Checklist helpers
    const addChecklist = (type: string) => {
        const list = visaData[type].checklists || [];
        updateVisaDetail(type, 'checklists', [...list, { label: '', url: '' }]);
    };
    const updateChecklist = (type: string, index: number, field: keyof ChecklistItem, value: string) => {
        const list = [...(visaData[type].checklists || [])];
        list[index] = { ...list[index], [field]: value };
        updateVisaDetail(type, 'checklists', list);
    };
    const removeChecklist = (type: string, index: number) => {
        const list = [...(visaData[type].checklists || [])];
        list.splice(index, 1);
        updateVisaDetail(type, 'checklists', list);
    };

    // Download helpers
    const addDownload = (type: string) => {
        const list = visaData[type].downloads || [];
        updateVisaDetail(type, 'downloads', [...list, { label: '', url: '', description: '', isExternal: false }]);
    };
    const updateDownload = (type: string, index: number, field: string, value: any) => {
        const list = [...(visaData[type].downloads || [])];
        list[index] = { ...list[index], [field]: value };
        updateVisaDetail(type, 'downloads', list);
    };
    const removeDownload = (type: string, index: number) => {
        const list = [...(visaData[type].downloads || [])];
        list.splice(index, 1);
        updateVisaDetail(type, 'downloads', list);
    };

    // Per-visa formalities helpers
    const addVisaFormality = (type: string) => {
        const list = visaData[type].formalities || [];
        updateVisaDetail(type, 'formalities', [...list, '']);
    };
    const updateVisaFormality = (type: string, index: number, value: string) => {
        const list = [...(visaData[type].formalities || [])];
        list[index] = value;
        updateVisaDetail(type, 'formalities', list);
    };
    const removeVisaFormality = (type: string, index: number) => {
        const list = [...(visaData[type].formalities || [])];
        list.splice(index, 1);
        updateVisaDetail(type, 'formalities', list);
    };

    const updateCountryFormality = (index: number, value: string) => {
        const list = [...countryFormalities];
        list[index] = value;
        setCountryFormalities(list);
    };

    const addCountryFormality = () => {
        setCountryFormalities([...countryFormalities, '']);
    };

    const removeCountryFormality = (index: number) => {
        const list = [...countryFormalities];
        list.splice(index, 1);
        setCountryFormalities(list);
    };

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const leftPercent = Math.round((x / rect.width) * 100);
        const topPercent = Math.round((y / rect.height) * 100);

        setLeft(leftPercent);
        setTop(topPercent);
    };

    const handleDelete = async () => {
        if (!countryId) {
            setStatus("Error: Enter a Country ID to delete.");
            return;
        }

        const confirmDelete = window.confirm(
            `ARE YOU ABSOLUTELY SURE?\n\nThis will permanently DELETE all data for "${name || countryId}" from the database.\n\nThis action CANNOT be undone.`
        );

        if (!confirmDelete) return;

        setLoading(true);
        setStatus('Deleting...');

        try {
            await deleteDoc(doc(db, 'countries', countryId.toLowerCase()));

            // Reset form
            setCountryId('');
            setName('');
            setCode('');
            setTop(0);
            setLeft(0);
            setVisaData({});
            setFiles([]);
            setCountryFormalities(['']);

            setStatus('Country deleted successfully.');
        } catch (error: any) {
            console.error("Error deleting:", error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!countryId || !name || !code) {
            setStatus("Error: Country ID, Name, and Code are required.");
            return;
        }

        setLoading(true);
        setStatus('Saving...');

        try {
            const data: CountryData = {
                name,
                code,
                coordinates: { top, left },
                visa: visaData as any,
                files: files,
                formalities: countryFormalities.filter(f => f.trim() !== '')
            };

            await setDoc(doc(db, 'countries', countryId.toLowerCase()), data);
            setStatus('Saved successfully!');
            // Optional: Reset form or keep it for editing
        } catch (error: any) {
            console.error("Error saving:", error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Helper to load existing data (simple implementation for now: fetch by ID if user types it and hits Enter? Or just a separate list. sticking to Create/Overwrite for now as "Admin Form")
    const loadExisting = async () => {
        if (!countryId) return;
        setLoading(true);
        try {
            const docRef = doc(db, 'countries', countryId.toLowerCase());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as CountryData;
                setName(data.name);
                setCode(data.code);
                setTop(data.coordinates?.top || 0);
                setLeft(data.coordinates?.left || 0);
                setVisaData(data.visa as any || {});
                setFiles(data.files || []);
                setCountryFormalities(data.formalities || ['']);
                setStatus('Loaded existing data.');
            } else {
                setStatus('No existing data found for this ID. Creating new.');
                // Reset fields if needed, or keep for new entry
            }
        } catch (e: any) {
            setStatus(`Error loading: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 pb-32">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-slate-800">Admin Console</h1>
                    <Link to="/" className="flex items-center text-slate-500 hover:text-indigo-600 font-bold">
                        <ArrowLeft className="mr-2 h-5 w-5" /> Back Home
                    </Link>
                </div>

                {/* Global Status */}
                {status && (
                    <div className={`p-4 rounded-xl mb-8 font-bold ${status.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {status}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Country Identity */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Country Identity</h2>

                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-1">Slug / ID (e.g., 'india')</label>
                            <div className="flex gap-2">
                                <input
                                    value={countryId}
                                    onChange={(e) => setCountryId(e.target.value)}
                                    className="w-full p-3 border rounded-xl font-mono text-sm bg-slate-50 focus:ring-2 ring-indigo-500 outline-none"
                                    placeholder="unique-id"
                                />
                                <button onClick={loadExisting} className="px-4 py-2 bg-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-300">Load</button>
                                <button
                                    onClick={handleDelete}
                                    disabled={loading || !countryId}
                                    className="px-4 py-2 bg-red-100 rounded-xl font-bold text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-1">Display Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-1">ISO Code</label>
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full p-3 border rounded-xl font-mono uppercase"
                                maxLength={2}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1">Map Top (%)</label>
                                <input
                                    type="number"
                                    value={top}
                                    onChange={(e) => setTop(Number(e.target.value))}
                                    className="w-full p-3 border rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1">Map Left (%)</label>
                                <input
                                    type="number"
                                    value={left}
                                    onChange={(e) => setLeft(Number(e.target.value))}
                                    className="w-full p-3 border rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Map Picker Tool */}
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-500 mb-3">Interactive Map Picker (Click to set coordinates)</label>
                            <div
                                onClick={handleMapClick}
                                className="relative w-full aspect-[16/9] bg-slate-900 rounded-2xl border-2 border-slate-200 shadow-inner overflow-hidden cursor-crosshair group"
                            >
                                {/* Map Background (Matching Home.tsx) */}
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                                    alt="World Map Interface"
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 invert brightness-50 contrast-125 select-none pointer-events-none"
                                />

                                {/* Coordinate Guidelines */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
                                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
                                </div>

                                {/* Active Marker */}
                                <div
                                    className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
                                    style={{ top: `${top}%`, left: `${left}%` }}
                                >
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-600 border-2 border-white shadow-lg"></span>
                                </div>

                                {/* Dynamic Coordinate Display */}
                                <div className="absolute bottom-2 right-3 bg-slate-900/80 backdrop-blur-sm text-[10px] text-white font-mono px-2 py-1 rounded-md border border-white/10 pointer-events-none">
                                    TOP: {top}% | LEFT: {left}%
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-slate-400 italic">
                                * The marker shows where the point will appear on the homepage world map.
                            </p>
                        </div>
                    </div>

                    {/* Global Files Manager */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Country Files (Guides etc.)</h2>
                        <div className="space-y-3">
                            {files.length === 0 && <p className="text-slate-400 italic text-sm">No global files added.</p>}
                            {files.map((file, idx) => (
                                <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border">
                                    <div className="flex-1 grid gap-2">
                                        <input
                                            value={file.name}
                                            onChange={(e) => updateFile(idx, 'name', e.target.value)}
                                            className="w-full p-2 border rounded-lg text-sm"
                                            placeholder="File Name (e.g. Travel Guide)"
                                        />
                                        <input
                                            value={file.url}
                                            onChange={(e) => updateFile(idx, 'url', e.target.value)}
                                            className="w-full p-2 border rounded-lg text-sm"
                                            placeholder="File URL (Google Drive etc.)"
                                        />
                                    </div>
                                    <button onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-600 p-2">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleAddFile}
                                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                            >
                                <Plus className="h-4 w-4" /> Add File
                            </button>
                        </div>
                    </div>

                    {/* Country Formalities */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Common Formalities</h2>
                        <div className="space-y-3">
                            {countryFormalities.map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        value={item}
                                        onChange={(e) => updateCountryFormality(idx, e.target.value)}
                                        className="w-full p-3 rounded-xl border text-sm"
                                        placeholder="Add formality item..."
                                    />
                                    <button onClick={() => removeCountryFormality(idx)} className="text-slate-400 hover:text-red-500">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addCountryFormality}
                                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                            >
                                <Plus className="h-4 w-4" /> Add Formality
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Visa Type Manager */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Active Visa Types</h2>

                        <div className="flex gap-2 mb-4">
                            <div className="flex-1">
                                <input
                                    list="visaTypes"
                                    value={selectedVisaType}
                                    onChange={(e) => setSelectedVisaType(e.target.value)}
                                    className="w-full p-3 border rounded-xl bg-white"
                                    placeholder="Select or Type Visa Category..."
                                />
                                <datalist id="visaTypes">
                                    {Object.values(VisaType).map(t => (
                                        <option key={t} value={t} />
                                    ))}
                                </datalist>
                            </div>
                            <button
                                onClick={handleAddVisaType}
                                disabled={!selectedVisaType}
                                className="bg-indigo-600 text-white p-3 rounded-xl disabled:opacity-50"
                            >
                                <Plus className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {Object.keys(visaData).length === 0 && <p className="text-slate-400 italic">No visa types added yet.</p>}
                            {Object.keys(visaData).map((type) => (
                                <div key={type} className="flex justify-between items-center p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <span className="font-bold text-indigo-900">{type}</span>
                                    <button onClick={() => handleRemoveVisaType(type)} className="text-red-400 hover:text-red-600">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dynamic Forms for Each Visa Type */}
                <div className="space-y-12">
                    {(Object.entries(visaData) as [string, VisaCategoryDetails][]).map(([type, details]) => (
                        <div key={type} className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                <span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full uppercase tracking-wider">Configuring</span>
                                {type}
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-1">Description</label>
                                    <textarea
                                        value={details.description}
                                        onChange={(e) => updateVisaDetail(type, 'description', e.target.value)}
                                        className="w-full p-3 rounded-xl border focus:ring-2 ring-indigo-500 outline-none"
                                        rows={2}
                                    />
                                </div>

                                {/* Requirements */}
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Requirements</label>
                                    <div className="space-y-2">
                                        {(details.requirements || []).map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    value={item}
                                                    onChange={(e) => updateArrayField(type, 'requirements', idx, e.target.value)}
                                                    className="w-full p-3 rounded-xl border text-sm"
                                                    placeholder="Add requirement item..."
                                                />
                                                <button onClick={() => removeArrayItem(type, 'requirements', idx)} className="text-slate-400 hover:text-red-500">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => addArrayItem(type, 'requirements')} className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                            <Plus className="h-4 w-4" /> Add Requirement
                                        </button>
                                    </div>
                                </div>

                                {/* Per-Visa-Type Files */}
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Files (Per Visa Type)</label>
                                    <div className="space-y-3">
                                        {(details.files || []).length === 0 && <p className="text-slate-400 italic text-sm">No files added for this visa type.</p>}
                                        {(details.files || []).map((file, idx) => (
                                            <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded-xl border">
                                                <div className="flex-1 grid gap-2">
                                                    <input
                                                        value={file.name}
                                                        onChange={(e) => updateVisaFile(type, idx, 'name', e.target.value)}
                                                        className="w-full p-2 border rounded-lg text-sm"
                                                        placeholder="File Name (e.g. Application Form)"
                                                    />
                                                    <input
                                                        value={file.url}
                                                        onChange={(e) => updateVisaFile(type, idx, 'url', e.target.value)}
                                                        className="w-full p-2 border rounded-lg text-sm"
                                                        placeholder="File URL (Google Drive etc.)"
                                                    />
                                                </div>
                                                <button onClick={() => removeVisaFile(type, idx)} className="text-red-400 hover:text-red-600 p-2">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => addVisaFile(type)}
                                            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" /> Add File
                                        </button>
                                    </div>
                                </div>

                                {/* Checklists */}
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Checklists (Label + URL)</label>
                                    <div className="space-y-3">
                                        {(details.checklists || []).length === 0 && <p className="text-slate-400 italic text-sm">No checklists added.</p>}
                                        {(details.checklists || []).map((item, idx) => (
                                            <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded-xl border">
                                                <div className="flex-1 grid gap-2">
                                                    <input
                                                        value={item.label}
                                                        onChange={(e) => updateChecklist(type, idx, 'label', e.target.value)}
                                                        className="w-full p-2 border rounded-lg text-sm"
                                                        placeholder="Checklist Label"
                                                    />
                                                    <input
                                                        value={item.url}
                                                        onChange={(e) => updateChecklist(type, idx, 'url', e.target.value)}
                                                        className="w-full p-2 border rounded-lg text-sm"
                                                        placeholder="Checklist URL"
                                                    />
                                                </div>
                                                <button onClick={() => removeChecklist(type, idx)} className="text-red-400 hover:text-red-600 p-2">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => addChecklist(type)} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                            <Plus className="h-4 w-4" /> Add Checklist
                                        </button>
                                    </div>
                                </div>

                                {/* Downloads */}
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Downloads (Label, URL, Description, External?)</label>
                                    <div className="space-y-3">
                                        {(details.downloads || []).length === 0 && <p className="text-slate-400 italic text-sm">No downloads added.</p>}
                                        {(details.downloads || []).map((item, idx) => (
                                            <div key={idx} className="bg-white p-3 rounded-xl border space-y-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        value={item.label}
                                                        onChange={(e) => updateDownload(type, idx, 'label', e.target.value)}
                                                        className="flex-1 p-2 border rounded-lg text-sm"
                                                        placeholder="Label (e.g. India e-Visa Guide)"
                                                    />
                                                    <button onClick={() => removeDownload(type, idx)} className="text-red-400 hover:text-red-600 p-1">
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <input
                                                    value={item.url}
                                                    onChange={(e) => updateDownload(type, idx, 'url', e.target.value)}
                                                    className="w-full p-2 border rounded-lg text-sm"
                                                    placeholder="URL (e.g. https://indianvisaonline.gov.in/)"
                                                />
                                                <input
                                                    value={item.description || ''}
                                                    onChange={(e) => updateDownload(type, idx, 'description', e.target.value)}
                                                    className="w-full p-2 border rounded-lg text-sm"
                                                    placeholder="Description (e.g. Official e-Visa portal redirect)"
                                                />
                                                <label className="flex items-center gap-2 text-sm font-bold text-slate-500 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.isExternal || false}
                                                        onChange={(e) => updateDownload(type, idx, 'isExternal', e.target.checked)}
                                                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    External Link (opens in new tab with globe icon)
                                                </label>
                                            </div>
                                        ))}
                                        <button onClick={() => addDownload(type)} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                            <Plus className="h-4 w-4" /> Add Link
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 sticky bottom-8 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-2xl flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all flex items-center gap-3"
                    >
                        <Save className="h-6 w-6" />
                        {loading ? 'Committing Changes...' : 'Save Configuration'}
                    </button>
                </div>

            </div >
        </div >
    );
};

export default AdminCountryForm;
