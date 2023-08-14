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
          console.log(user);
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
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
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
