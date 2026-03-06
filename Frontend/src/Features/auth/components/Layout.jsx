import React from "react";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 drop-shadow-lg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const Layout = ({ login, register, isRegister }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #bc1888, transparent)' }} />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #f09433, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #dc2743, transparent)' }} />

      {/* CARD */}
      <div
        className="relative flex h-[580px] md:h-[68vh] w-full max-w-md md:max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}
      >
        {/* ===== Login form ===== */}
        <div
          className={`absolute md:static top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out z-0 md:z-auto ${isRegister ? "-translate-x-full md:-translate-x-10 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
            }`}
        >
          {login}
        </div>

        {/* ===== Register form ===== */}
        <div
          className={`absolute md:static top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out z-0 md:z-auto ${isRegister ? "translate-x-0 opacity-100" : "translate-x-full md:translate-x-10 opacity-0 pointer-events-none"
            }`}
        >
          {register}
        </div>

        {/* ===== SLIDING GRADIENT PANEL (Hidden on Mobile) ===== */}
        <div
          className={`
            hidden md:flex absolute top-0 right-0 h-full w-1/2 z-10
            items-center justify-center
            transition-transform duration-700 ease-in-out
            ${isRegister ? "-translate-x-full" : "translate-x-0"}
          `}
          style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="relative text-center px-10 z-10 flex flex-col items-center">
            <InstagramIcon />
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isRegister ? "Welcome Back!" : "Join the community"}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              {isRegister
                ? "Already have an account? Sign in and keep sharing your moments."
                : "Create an account and start sharing your best moments with the world."}
            </p>
            <div className="mt-6 flex gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <div className="w-6 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
