import axios, { AxiosInstance } from "axios";
import { signIn } from "next-auth/react";


export class AuthService {
  private readonly url: string =
    process.env.NODE_ENV === "production"
      ? "https://api.example.com"
      : "http://localhost:3000";
  protected readonly instance: AxiosInstance;
  public constructor() {
    this.instance = axios.create({
      baseURL: this.url,
      timeout: 3000,
      headers: {
        "Content-Type": "application/json",
      },
      timeoutErrorMessage: "Request timed out",
    });
  }

  login = async (email: string, password: string) => {
    console.log(email, password)
    return await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
  };

  signup = async (email: string, password: string) => {
    return await this.instance.post("/api/auth/signup", { email, password });
  };
}
