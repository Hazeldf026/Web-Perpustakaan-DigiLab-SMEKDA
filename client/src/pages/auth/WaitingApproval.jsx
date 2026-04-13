import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-hot-toast';

const WaitingApproval = () => {
    const { identifier } = useParams();
    const navigate = useNavigate();
    const socket = useSocket();
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        if (!socket) return;

        // Join room berdasarkan identifier agar menerima notif privat
        socket.emit("join_room", identifier);

        // Mendengarkan sinyal real-time jika Admin melakukan ACC
        socket.on("account_status", (data) => {
            if (data.approved) {
                setIsApproved(true);
            }
        });

        // Fallback: Polling setiap 3 detik (antisipasi jika koneksi socket terputus)
        const checkStatus = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/registration-status/${identifier}`);
                const data = await res.json();
                if (data.approved) {
                    setIsApproved(true);
                }
            } catch (error) {
                console.error("Cek status gagal", error);
            }
        };

        const interval = setInterval(() => {
            if (!isApproved) checkStatus();
        }, 3000);

        return () => {
            socket.off("account_status");
            clearInterval(interval);
        };
    }, [socket, identifier, isApproved]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md text-center border border-gray-100">
                {!isApproved ? (
                    <>
                        <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">Verifikasi Akun</h2>
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium mb-6">
                            Permintaan pendaftaranmu sedang ditinjau oleh Admin. Mohon tunggu sejenak, halaman ini akan otomatis berubah setelah di-ACC.
                        </div>
                        <p className="text-gray-400 text-sm">Identifier: <span className="font-mono font-bold">{identifier}</span></p>
                    </>
                ) : (
                    <>
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">Akun Aktif!</h2>
                        <p className="text-gray-500 text-sm mb-8">Selamat! Admin telah menyetujui pendaftaranmu di DigiLab SMEKDA. Sekarang kamu bisa masuk ke perpustakaan digital.</p>
                        <button 
                            onClick={() => navigate('/login-user')}
                            className="w-full bg-[#4e8a68] text-white font-bold py-4 rounded-full shadow-lg hover:bg-green-800 transition transform hover:-translate-y-1"
                        >
                            Masuk Sekarang
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default WaitingApproval;