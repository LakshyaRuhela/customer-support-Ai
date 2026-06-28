"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

function NavBar({ email: initialEmail }: { email?: string }) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null); // to off poput from anywhere click on screen

  // set email starting
  useEffect(() => {
    setEmail(initialEmail ?? "");
  }, [initialEmail]);

  // use Effect for popupref that add mousedown eventlistener and the remove it
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // useEffect to sync seesion
  useEffect(() => {
    const syncSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });
        const data = await response.json();
        setEmail(data.email ?? "");
      } catch (err) {
        console.error("Failed to sync session", err);
      }
    };
    // call sync session
    syncSession();

    // to continuosuly check about session  after login to show profile

    const retries = [100, 400, 800, 1500];
    const timers = retries.map((delay) =>
      window.setTimeout(() => {
        syncSession();
      }, delay),
    );

    // focus to focus on profile after switching tab
    // add focus evenlistener then remove it
    const handleFocus = () => syncSession();
    window.addEventListener("focus", handleFocus);

    // clear timeout and remove focus event listener
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // function to handle login button
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const firstLetter = email ? email[0].toUpperCase() : "";

  //  function to handle logout
  const handleLogout = async () => {
    try {
      const result = await axios.get("api/auth/logout");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  // Navigator for navigate
  const navigate = useRouter();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 "
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" max-w-7xl mx-auto px-6 h-16 flex items-center justify-between ">
        {/* logo  */}
        <div className="text-lg font-semibold tracking-tight ">
          Support <span className="text-zinc-500">AI</span>
        </div>

        {/* profile on navbar  */}
        {email ? (
          <div className="relative " ref={popupRef}>
            <button
              className="w-10 h-10 rounded-full cursor-pointer bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition "
              onClick={() => setOpen(!open)}
            >
              {firstLetter}
            </button>

            {/* Popup of profile */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className=" absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden "
                >
                  {/* dashboard button */}
                  <button
                    className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100 cursor-pointer "
                    onClick={() => navigate.push("/dashboard")}
                  >
                    Dashboard
                  </button>
                  {/* Logout button */}
                  <button
                    className="px-4 py-3 text-sm text-red-600 hover:bg-zinc-100 cursor-pointer block "
                    onClick={handleLogout}
                  >
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
  );
}

export default NavBar;
