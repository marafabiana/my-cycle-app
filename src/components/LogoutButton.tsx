"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter(); // To redirect after logout

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Logs out without automatic redirection
    router.push("/login"); // Redirects to the login page
  };

  return (
    <Button onClick={handleLogout} className="bg-gray-300 hover:bg-gray-400 w-full">
      Sign Out
    </Button>
  );
}
