import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
    // error: ""
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, _req) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v${process.env.API_VERSION1}/Auth/user-login`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          const user = await response.json();
          if (response.ok) {
            return { ...user };
          } else {
            return null;
            // throw new Error(user?.message);
          }
        } catch (error: any) {
          console.log("🚀 ~ authorize: ~ error:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user, trigger }: any) {
      if (user) {
        token.accessToken = user?.data.jwt || null;
        // TODO: check
        // token.permissions = user?.data.permissions;
        // token.licenseType = user?.data.licenseType;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user.accessToken = token.accessToken;
      // TODO: check
      //   session.permissions = token.permissions;
      //   session.licenseType = token.licenseType;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
