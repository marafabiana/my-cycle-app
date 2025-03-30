import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // 🔥 Garante que o ID do usuário existe
  }

  interface Session {
    user: User & DefaultSession["user"]; // 🔥 Agora `session.user` tem `id`
  }
}
