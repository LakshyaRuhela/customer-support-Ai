import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/getSession";

async function Dashboard() {
  const session = await getSession();
  return (
    <>
      <DashboardClient ownerId={session?.id!} />
    </>
  );
}
export default Dashboard;
