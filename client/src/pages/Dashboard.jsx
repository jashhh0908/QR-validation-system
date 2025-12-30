import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { importToDB, readParticpants } from '../services/api';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const[isImporting, setIsImporting] = useState(false);
    const seedData = async (event) => {
        const file = event.target.files[0];
        if(!file) return;

        if(!file.name.endsWith('.csv')) {
            toast.error("Please input a CSV file");
            return;
        }
        setIsImporting(true)
        const toastId = toast.loading("Importing Data...");
        try {
            await importToDB(file);
            toast.success("Import Successful", { id: toastId });
            //just to check if the import to db was actually succesful or not
            const {data} = await readParticpants();
            console.log("Server data: ", data.participants);
            setIsImporting(false);
            if(fileInputRef)
                fileInputRef.current.value = "";
        } catch (error) {
            console.error("Error importing: ", error);
            toast.error("Failed to import", { id: toastId });
        }
    }

    const scanQr = () => {
        navigate('/scan');
    }
    return (
        <div className="w-full min-h-screen flex flex-col bg-[#050505]">
            <Navbar />
            <main className="flex-1 p-8 flex flex-col items-center justify-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-cyan-900/10 blur-[120px] rounded-full -z-10" />
                <div className="w-full max-w-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 shadow-2xl text-center">
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                        Welcome, <span className="text-cyan-500">Event Manager</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-5 max-w-md mx-auto">
                        Begin the CSV import process.
                    </p>
                    <div className='flex justify-center gap-10'>
                        <button
                            onClick={scanQr}
                            disabled={isImporting}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 border border-cyan-400/30 text-white hover:bg-cyan-500 rounded-2xl transition-all font-bold text-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            Scan QR
                        </button>
                        <input 
                            type='file'
                            ref={fileInputRef}
                            onChange={seedData}
                            accept='.csv'
                            className='hidden'
                        />
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            disabled={isImporting}
                            className={`flex items-center justify-center gap-3 px-8 py-4 bg-zinc-800/50 border border-white/10 text-white hover:bg-zinc-800 rounded-2xl transition-all font-bold text-lg active:scale-95
                                ${isImporting ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50" 
                                : "bg-zinc-800/50 border border-white/10 text-white hover:bg-zinc-800"}`}
                        >
                            {isImporting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                            <>
                            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg> 
                            Import CSV
                            </>
                            )} 
                        </button>
                        
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;  