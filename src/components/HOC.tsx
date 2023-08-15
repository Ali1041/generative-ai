import { Header } from "./header";
import { ReactElement, createContext, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";

export const AuthContext = createContext({});

export const HOC = (WrappedComponent: any) => {
  const { data } = useSession();
  // const data = {}
  const router = useRouter();
  console.log(data)

  // Write me a function that checks if the user is logged in

  if (data?.user){
    return (
      <AuthContext.Provider value={{ session: data }}>
          <>
            <Header />
            <div className="max-w-7xl mx-auto p-5">
              {WrappedComponent.children}
            </div>
          </>
      </AuthContext.Provider>
    );
  }
  else if (router.pathname === "/auth/login") {
    return <Login />;
  }
  else if (router.pathname === "/auth/signup") {
    return <Signup />;
  }
};
