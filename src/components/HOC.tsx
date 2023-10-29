import { Header } from "./header";
import { ReactElement, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "@/pages/auth/login";

export const AuthContext = createContext({});

export const HOC = (WrappedComponent: any): any => {
  const router = useRouter();

  return (
    <>
             <Header />
             <div className="max-w-7xl mx-auto p-5">
               {WrappedComponent.children}
             </div>
           </>
  )
};
