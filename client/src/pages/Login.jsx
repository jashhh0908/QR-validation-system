import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
    const [passKey, setPassKey] = useState("");
    const navigate = useNavigate();
    const login = (e) => {
        e.preventDefault();
        if(passKey === 'event2026') {
            localStorage.setItem('adminKey', passKey);
            toast.success('Access Granted');
            navigate('/dashboard');
        } else {
            toast.error("Access Denied: Invalid Key");
        }
    };
    
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#050505] px-4">
            <div className="w-full max-w-sm p-8 bg-white backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl text-center">         
                    <h2 className="text-3xl font-bold mb-6 text-neutral-800 bg-clip-text">  
                        Admin Login
                    </h2>
                    <form onSubmit={login}>
                        <input 
                            type='password'
                            placeholder="Enter Passkey"
                            className="w-full mb-4 bg-zinc-600 border border-zinc-700 p-2 rounded-2xl text-white outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-gray-200 text-center text-lg tracking-widest"
                            value={passKey} 
                            onChange={(e) => setPassKey(e.target.value)}
                            required
                        />
                        <button
                            type='submit'
                            className="w-full bg-[#ffff] text-black hover:bg-black hover:text-white hover:shadow-gray-700 font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-cyan-900/20"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
            </div>
        </div>
    );
}
export default Login