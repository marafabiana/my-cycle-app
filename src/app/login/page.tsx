"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.ok) router.push("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <Button type="submit" className="w-full">Log In</Button>
      </form>

      <p className="text-center mt-4 text-sm">
        New to My Cycle?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Create an account
        </Link>
      </p>

    </div>
  );
}
