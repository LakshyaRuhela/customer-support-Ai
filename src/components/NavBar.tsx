"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function NavBar({ email: initialEmail }: { email?: string }) {
  const [email, setEmail] = useState(initialEmail ?? ""); // state for email
  const [open, setOpen] = useState(false); // state for profile
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // calll automatic state
  useEffect(() => {
    setEmail(initialEmail ?? "");
  }, [initialEmail]);

  // automatic sync session details
  useEffect(() => {
    const syncSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });
        const data = await response.json();
        setEmail(data.email ?? "");
      } catch (error) {
        console.error("Failed to sync session", error);
      }
    };

    syncSession();

    const handleFocus = () => {
      syncSession();
    };

    // if we swith to tabs , then it focus on profile and again sync session , then remove that event listener
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const firstLetter = email ? email[0].toUpperCase() : "";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 "
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" max-w-7xl mx-auto px-6 h-16 flex items-center justify-between ">
          {/* logo */}
          <div className="text-lg font-semibold tracking-tight ">
            Support <span className="text-zinc-500">AI</span>
          </div>

          {/* login button & profile icon */}
          {email ? (
            <div className="relative " ref={popupRef}>
              {/*  popup ref for mouse down effect to close the profile popup menu */}
              {/* Icon button */}
              <button
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition "
                onClick={() => setOpen(!open)}
              >
                {firstLetter}
              </button>

              {/* If profile open the show */}
              {/* Animate presenece for exit a motion  */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className=" absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden "
                  >
                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100 cursor-pointer ">
                      Dashboard
                    </button>
                    <button className="px-4 py-3 text-sm text-red-600 hover:bg-zinc-100 cursor-pointer block ">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-700 transition disabled:opacity-60 flex items-center gap-2 "
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}
export default NavBar;
