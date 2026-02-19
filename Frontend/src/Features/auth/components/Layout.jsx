import React from "react";
import LoginLottie from "./loginLottie";

const Layout = ({ login, register, isRegister }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {/* CARD */}
      <div className="relative flex h-[65vh] w-[60vw] rounded-xl shadow-xl overflow-hidden bg-white">

        {/* ===== LEFT HALF — Login form ===== */}
        <div className="w-1/2 flex items-center justify-center">
          <div className={`transition-all duration-700 w-full flex justify-center ${isRegister ? "-translate-x-10 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
            }`}>
            {login}
          </div>
        </div>

        {/* ===== RIGHT HALF — Register form ===== */}
        <div className="w-1/2 flex items-center justify-center">
          <div className={`transition-all duration-700 w-full flex justify-center ${isRegister ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
            }`}>
            {register}
          </div>
        </div>

        {/* ===== SLIDING BLUE PANEL ===== */}
        <div
          className={`
            absolute top-0 right-0 h-full w-1/2 z-10
            bg-blue-600 text-white
            flex items-center justify-center
            transition-transform duration-700 ease-in-out
            ${isRegister ? "-translate-x-full" : "translate-x-0"}
          `}
        >
          <div className="text-center px-10">
            <LoginLottie />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;
