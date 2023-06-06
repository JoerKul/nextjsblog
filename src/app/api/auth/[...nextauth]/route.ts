import { prisma } from "@/db";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { sign } from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 10 * 60, // 10 minute
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials", credentials);

        if (!credentials?.email || !credentials.password) {
          console.log("No credentials");
          return null;
        }

        // Find user by email address
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // Check password is valid (using bcrypt)
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Generate JWT token with user id
        const bearerToken = sign(
          { id: user.id },
          process.env.NEXTAUTH_SECRET!,
          {
            expiresIn: "30m",
          }
        );
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
          bearerToken,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      //console.log("Session callback", session, token, user);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
          bearerToken: token.bearerToken,
        },
      };
    },
    jwt: ({ token, user, account, profile }) => {
      //console.log("JWT callback", token, user, account, profile);
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          bearerToken: u.bearerToken,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
