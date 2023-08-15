import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("hereere");
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (result.error) {
          return null;
        }
        const user = result.user;
        // If no error and we have user data, return it
        if (res.status === 200 && user) {
          return {
            token: {
              id: user.id,
              email: user.email,
            },
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user; // Setting token in session
      return session;
    },
  },
  secret: "somesecret",
  jwt: {
    secret: "somesecret",
    encryption: true,
  },
  pages: {
    signIn: "/auth/login",
  },
});
