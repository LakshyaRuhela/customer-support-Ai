"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavBar from "./NavBar";

function HomeClient({ email: initialEmail }: { email?: string }) {
  // router to check auth == 1and refresh router
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "1") {
      router.refresh();
      window.history.replaceState({}, "", "/");
    }
  }, [router]);

  // function to handle login button or by axios function call
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  //  content array for features
  const features = [
    {
      title: "Plug & Play",
      desc: "Add the chatbotto your site with a single script tag.",
    },
    {
      title: "Admin Controlled",
      desc: "You control exactly what the AI knows and answers.",
    },
    {
      title: "Always Online",
      desc: "Your customers get instant support 24 * 7",
    },
  ];

  // navigate to dashboard
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden ">
      <NavBar email={initialEmail} />

      {/* Home page section */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center ">
          {/* left columns div */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              AI Customer Support <br />
              <span>Built for Modern Websites</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-600 mx-w-xl ">
              Add a powerful AI chatbot to your website in minutes. Let your
              customers get instant answers using your own business knowledge
            </p>

            <div className="mt-10 flex gap-4">
              {/* Get started button */}
              {initialEmail ? (
                <button
                  className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 cursor-pointer transition disabled:opacity-60 "
                  onClick={() => navigate.push("/dashboard")}
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 cursor-pointer transition disabled:opacity-60 "
                  onClick={handleLogin}
                >
                  Get Started
                </button>
              )}

              {/* Learn more button */}
              <a
                href="#feature"
                className="px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 cursor-pointer hover:bg-zinc-100 transition "
              >
                Learn More...
              </a>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* chatbot div */}
            <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6 ">
              {/* Live chat preview */}
              <div className="text-sm text-zinc-500 mb-3">
                Live Chat Preview
              </div>
              {/* chat div */}
              <div className="space-y-3">
                <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit left-0 ">
                  Do you offer Cash on Delivery?
                </div>
                <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit  ">
                  Yes, Cash on Delivery is Available.
                </div>
              </div>

              {/*  */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
              >
                💭
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section id="feature" className="bg-zinc-50 py-28 px-6 border-zinc-200 ">
        <div className="max-w-6xl mx-auto ">
          <motion.h2
            className="text-3xl font-semibold text-center "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            Why Business choose SupportAI
          </motion.h2>

          {/* cards for details */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 ">
            {/* Content array at top before return */}
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: false }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200 "
              >
                <h1 className="text-lg font-medium ">{f.title}</h1>
                <p className="mt-3 text-zinc-600 text-sm ">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* footer  */}
      <footer className="py-10 text-center text-sm text-zinc-500 ">
        &copy; {new Date().getFullYear()} Support.AI . All rights reserved.
      </footer>
    </div>
  );
}
export default HomeClient;
