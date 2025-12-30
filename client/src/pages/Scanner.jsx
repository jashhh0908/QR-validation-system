import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import { checkIn, checkOut } from '../services/api';

const Scanner = () => {
    const navigate = useNavigate();
    const [scanResult, setScanResult] = useState(null);
    const [scanMode, setScanMode] = useState('in');
    const scannerRef = useRef(null);
    const scanModeRef = useRef('in');
    useEffect(() => {
        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode("reader");
        }
        const startScanner = async () => {
            try {
                const state = scannerRef.current.getState();
                if (state === Html5QrcodeScannerState.UNKNOWN || state === Html5QrcodeScannerState.NOT_STARTED) {
                    await scannerRef.current.start(
                        { facingMode: "environment" },
                        {
                            fps: 10,
                            qrbox: (viewfinderWidth, viewfinderHeight) => ({
                                width: viewfinderWidth * 0.7,
                                height: viewfinderHeight * 0.7
                            }),
                            aspectRatio: 1.0 
                        },
                        onScanSuccess
                    );
                }
            } catch (err) {
                console.error("Camera start failed:", err);
            }
        };

        startScanner();

        return () => {
            const stopScanner = async () => {
                if (scannerRef.current) {
                    try {
                        const state = scannerRef.current.getState();
                        if (state !== Html5QrcodeScannerState.NOT_STARTED) {
                            await scannerRef.current.stop();
                        }
                    } catch (err) {
                        console.warn("Cleanup error:", err);
                    }
                }
            };
            stopScanner();
        };
    }, []);

    async function onScanSuccess(result) {
        const token = result.includes('/') ? result.split('/').pop() : result;
        
        if (scannerRef.current?.getState() === Html5QrcodeScannerState.SCANNING) {
            scannerRef.current.pause(true);
        }

        try {
            const response = (scanModeRef.current === 'in') ? await checkIn(token) : await checkOut(token);
            toast.success(`${scanModeRef.current === 'in' ? "Check-in: " : "Check-out: "} ${response.data.participant.name}`)
            setScanResult(response.data.participant);
        } catch (error) {
            toast.error(error.response?.data?.error || "Invalid Token");
        } finally {
            setTimeout(() => {
                if (scannerRef.current?.getState() === Html5QrcodeScannerState.PAUSED) {
                    scannerRef.current.resume();
                }
            }, 2000);
        }
    }

    return (
    <div className="h-screen w-full bg-[#050505] text-white fixed inset-0 overflow-hidden">        
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-8 pb-32">            
            <div className="max-w-md mx-auto px-6 h-auto flex flex-col">         
                <div className="flex bg-zinc-900 p-1 rounded-2xl mb-8 border border-white/5">
                    <button 
                        onClick={() => { setScanMode('in'); scanModeRef.current = 'in'; setScanResult(null); }}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${scanMode === 'in' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Check-In
                    </button>
                    <button 
                        onClick={() => { setScanMode('out'); scanModeRef.current = 'out'; setScanResult(null); }}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${scanMode === 'out' ? 'bg-rose-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Check-Out
                    </button>
                </div>       
                <div className="flex items-center justify-between mb-8 shrink-0">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    {scanMode === 'in' && <h1 className="text-xl font-bold text-cyan-500 tracking-tight">Entry Scanner</h1>}
                    {scanMode === 'out' && <h1 className="text-xl font-bold text-cyan-500 tracking-tight">Exit Scanner</h1>}
                    <div className="w-10"></div> 
                </div>
                
                <div className="w-full bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative mb-8 shrink-0">
                    <div id="reader" className="w-full aspect-square bg-black [&>video]:object-cover"></div>
                </div>

                {scanResult && (
                    <div className="p-8 bg-zinc-900/50 border border-cyan-500/20 backdrop-blur-2xl rounded-[2.5rem] text-center animate-in fade-in slide-in-from-bottom-4 duration-500 h-auto mb-10">
                        <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        {scanMode === 'in' && <p className="text-xs text-cyan-500 uppercase tracking-[0.3em] font-black mb-1">Entry Granted</p>}
                        {scanMode === 'out' && <p className="text-xs text-red-500 uppercase tracking-[0.3em] font-black mb-1">Exit Granted</p>}

                        <h2 className="text-3xl font-black text-white leading-tight wrap-break-word">{scanResult.name}</h2>
                        <p className="text-zinc-500 mt-1 font-medium break-all">{scanResult.email}</p>
                        
                        <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-zinc-500 mb-1">Year</p>
                                <p className="font-bold text-white text-lg">{scanResult.year}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-zinc-500 mb-1">Branch</p>
                                <p className="font-bold text-white text-lg">{scanResult.branch}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);
};

export default Scanner;