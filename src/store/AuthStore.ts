import { makeAutoObservable } from "mobx";
import { api, LoginResponse, RegisterResponse } from "../utils/api";

export class AuthStore {
  userId = 0;
  username = "";
  email = "";

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn(): boolean {
    return !!(this.userId && this.username && this.email);
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<string> {
    const data: RegisterResponse = await api.fetchRegister(
      username,
      email,
      password
    );

    if (data.errorMessage) {
      return data.errorMessage;
    }

    return "";
  }

  async login(email: string, password: string): Promise<string> {
    const data: LoginResponse = await api.fetchLogin(email, password);

    if (data.errorMessage) {
      console.error("Login error", data.errorMessage);
      return data.errorMessage;
    } else if (data.id && data.username) {
      this.userId = data.id;
      this.email = data.email;
      this.username = data.username;

      return "";
    } else {
      console.error("Invalid login response");
      return "Invalid response";
    }
  }

  logout() {
    this.userId = 0;
    this.username = "";
    this.email = "";
  }
}
