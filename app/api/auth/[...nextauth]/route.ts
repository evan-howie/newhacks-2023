import db from "@/utils/db";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@abc.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!correctPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
