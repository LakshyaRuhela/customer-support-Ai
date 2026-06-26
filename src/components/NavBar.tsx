"use client";
import React from "react";
import { motion } from "motion/react";

function NavBar() {
  return (
    <>
      <motion.div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 "
      initial={{y:-50}}
      animate={{y:0}}
      transition={{duration:0.5}}
      >
        <div className=" max-w-7xl mx-auto px-6 h-16 flex items-center justify-between ">
          {/* logo */}
          <div className="text-lg font-semibold tracking-tight ">
            Support <span className="text-zinc-500">AI</span>
          </div>
          {/* login button */}
          <button className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-700 transition disabled:opacity-60 flex items-center gap-2 ">
            Login
          </button>
        </div>
      </motion.div>
    </>
  );
}
export default NavBar;
