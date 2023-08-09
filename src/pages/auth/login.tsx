import useLoginHook from "@/Hooks/auth/useLoginHook";
import useLoginValidationHook from "@/Hooks/auth/useLoginValidationHook";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  const { email, password, onChange, onBlur } = useLoginValidationHook();
  const { isLoading, isError, onSubmit } = useLoginHook(email, password);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          width={100}
          height={100}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {isError.error && (
            <p className="text-red-500 text-sm">{isError.helperText}</p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email.value}
                onChange={(e) => onChange(e, "email")}
                onBlur={onBlur}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {email.error && (
                <p className="text-red-500 text-sm">{email.helperText}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password.value}
                onChange={(e) => onChange(e, "password")}
                onBlur={onBlur}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {password.error && (
                <p className="text-red-500 text-sm">{password.helperText}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={isLoading}
              onClick={onSubmit}
              className={
                "flex w-full justify-center rounded-md  px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm " +
                (isLoading
                  ? " cursor-not-allowed bg-indigo-300"
                  : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600")
              }
            >
              Sign in
              {isLoading && (
                <Spinner />
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link href={"/auth/signup"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
