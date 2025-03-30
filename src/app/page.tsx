import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Dashboard from "@/app/dashboard/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); 
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex items-center justify-between">
       
        <h1 className="text-2xl font-bold flex-grow text-center">
          Welcome, {session.user?.name}
        </h1>

        <div className="ml-4"> 
          <LogoutButton />
        </div>
        
      </div>

      <Dashboard />
    </div>
  );
}
