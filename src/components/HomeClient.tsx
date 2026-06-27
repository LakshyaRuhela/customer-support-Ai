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

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden ">
      <NavBar email={initialEmail} />

      {/* Home page section */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center ">
          {/* left columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              AI Customer Support <br />
              Built for Modern Websites
            </h1>
          </motion.div>

          {/* Right column */}
          <motion.div></motion.div>
        </div>
      </section>
    </div>
  );
}
export default HomeClient;
