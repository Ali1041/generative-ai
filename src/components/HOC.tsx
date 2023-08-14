import { Header } from "./header";
import { ReactElement, createContext, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";

export const AuthContext = createContext({});

export const HOC = (WrappedComponent: any): ReactElement => {
  const { data } = useSession();
  // const data = {}
  const router = useRouter();
  console.log(data)

  return (
    <AuthContext.Provider value={{ session: data }}>
      {data?.user ? (
        <>
          <Header />
          <div className="max-w-7xl mx-auto p-5">
            {WrappedComponent.children}
          </div>
        </>
      ) : router.pathname == "/auth/login" ? (
        <Login />
      ) : (
        <Signup />
      )}
    </AuthContext.Provider>
  );
};
