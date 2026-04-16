import { MapPin, Phone, Mail } from 'lucide-react';

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                {/* KOLOM 1: BRANDING & DESKRIPSI */}
                <div>
                    <h3 className="text-2xl font-bold mb-6">DigiLib SMEKDA</h3>
                    <p className="text-white/90 leading-relaxed text-sm">
                    Sistem informasi perpustakaan digital SMKN 2 Purwakarta. 
                    Mengintegrasikan layanan sirkulasi dan pengelolaan katalog buku 
                    untuk mempermudah akses literasi seluruh warga sekolah secara 
                    efisien dan transparan.
                    </p>
                </div>

                {/* KOLOM 2: JAM LAYANAN */}
                <div>
                    <h3 className="text-xl font-bold mb-6">Jam Layanan</h3>
                    <ul className="space-y-4 text-white/90 text-sm">
                    <li>
                        <span className="block font-semibold">Senin - Kamis:</span>
                        07.00 - 15.00 WIB
                    </li>
                    <li>
                        <span className="block font-semibold">Jumat:</span>
                        07.00 - 11.30 WIB
                    </li>
                    <li>
                        <span className="block font-semibold">Sabtu - Minggu:</span>
                        Tutup
                    </li>
                    <li>
                        <span className="block font-semibold">Istirahat:</span>
                        12.00 - 13.00 WIB
                    </li>
                    </ul>
                </div>

                {/* KOLOM 3: KONTAK SEKOLAH */}
                <div>
                    <h3 className="text-xl font-bold mb-6">Kontak Sekolah</h3>
                    <ul className="space-y-4 text-white/90 text-sm">
                    {/* Lokasi */}
                    <li className="flex items-start gap-3">
                        <MapPin size={20} />
                        <span>SMK Negeri 2 Purwakarta</span>
                    </li>
                    
                    {/* Telepon */}
                    <li className="flex items-center gap-3">
                        <Phone size={20} />
                        <span>0812-3456-7890</span>
                    </li>

                    {/* Email */}
                    <li className="flex items-center gap-3">
                        <Mail size={20} />
                        <span>digilibsmekda@gmail.com</span>
                    </li>
                    </ul>
                </div>

                {/* KOLOM 4: SOCIAL MEDIA */}
                <div>
                    <h3 className="text-xl font-bold mb-6">Social Media</h3>
                    <div className="flex gap-4">
                    {/* Instagram */}
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#528f6e] transition-all duration-300">
                        <InstagramIcon size={24} />
                    </a>

                    {/* Facebook */}
                    <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#528f6e] transition-all duration-300">
                        <FacebookIcon size={24} />
                    </a>
                    </div>
                </div>

                </div>

                {/* === GARIS PEMBATAS & COPYRIGHT === */}
                <div className="border-t border-white/20 pt-8 text-center">
                <p className="text-white/80 text-sm">
                    &copy; 2026 DigiLib SMKN 2 Purwakarta. All rights reserved.
                </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer