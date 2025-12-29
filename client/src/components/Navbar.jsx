import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('adminKey');
        toast.success("Logged out");
        navigate('/');
    };
    return (
        <>
        <nav className="w-full px-8 py-4 border-b border-white/5 bg-zinc-900/20 backdrop-blur-md flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl text-white font-bold tracking-tight">Event Central</h1>
                        <p className="text-[10px] text-cyan-500 uppercase tracking-[0.2em] font-bold">Admin Control Panel</p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-white hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all text-sm font-medium border border-transparent hover:border-red-400/20"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </nav>
        </>
        )
}

export default Navbar;