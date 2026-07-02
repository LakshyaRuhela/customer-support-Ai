"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

function DashboardClient({ ownerId }: { ownerId: string }) {
  const navigate = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSettings = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });

      console.log(result);
      setLoading(false);
    } catch (err) {
      // show server response body if available for easier debugging
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(err?.response?.data ?? err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 ">
      {/* NavBar */}
      <motion.div
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 "
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" max-w-7xl mx-auto px-6 h-16 flex items-center justify-between  ">
          {/* logo  */}
          <div
            className="text-lg font-semibold tracking-tight cursor-pointer "
            onClick={() => navigate.push("/")}
          >
            Support <span className="text-zinc-500">AI</span>
          </div>
          {/* Embede button */}
          <button className="px-4 py-2 rounded-lg border border-zinc-300 text-sm ">
            Embed Chatbot
          </button>
        </div>
      </motion.div>

      {/* Main Content  */}
      <div className=" flex justify-center px-4 py-14 mt-20">
        <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 ">
          {/* header */}
          <div className="mb-12">
            <h1 className="text-2xl font-semibold ">ChatBot Settings</h1>
            <p className="text-zinc-500 mt-1 ">
              Manage your Ai chatbot knowledge and business details
            </p>
          </div>

          {/* Content  */}
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            {/* input div */}
            <div className="space-y-4">
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Business Name"
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
              />
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Support Email"
                onChange={(e) => setSupportEmail(e.target.value)}
                value={supportEmail}
              />
            </div>
          </div>

          {/*  */}
          <div className="mb-10">
            <h1 className="text-lg font-medium mb-4">Knowledge Details</h1>
            <p className="text-sm text-zinc-500 mb-4 ">
              Add FAQs, policies, delivery info, refunds, etc.
            </p>
            {/* input div */}
            <div className="space-y-4">
              <textarea
                className="w-full h-45 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder={`Example: 
        ● Refund Policy : 7 days return available
        ● Delivery time : 3-5 working days
        ● Cash on Delivery Available
        ● Support hours
                    `}
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
              />
            </div>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 "
              onClick={handleSettings}
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default DashboardClient;
