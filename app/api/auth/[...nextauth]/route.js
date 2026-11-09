import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret"
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Allow sign-in with default johndoe@gmail.com or any email
        const email = credentials?.email || "johndoe@gmail.com";
        const name = email.split("@")[0] || "John Doe";
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return {
          id: "usr_" + Math.random().toString(36).substring(2, 9),
          name: formattedName === "Johndoe" ? "John Doe" : formattedName,
          email: email,
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
        };
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.provider = token.provider;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "board-dashboard-production-secret-9847198273"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
