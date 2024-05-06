import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string | null | undefined;
      role?: string | null | undefined;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string | null | undefined;
  }
}
