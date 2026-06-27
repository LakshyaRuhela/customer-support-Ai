import NavBar from "./NavBar";
import { getSession } from "@/lib/getSession";

async function HomeClient() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden ">
      <NavBar email={session?.user?.email} />
    </div>
  );
}
export default HomeClient;
