"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) router.push("/login");
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <Button type="submit" className="w-full">Join</Button>
      </form>
    </div>
  );
}
