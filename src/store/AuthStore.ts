import { makeAutoObservable } from "mobx";
import { api, LoginResponse, RegisterResponse } from "../service/api";

export class AuthStore {
  private _userId = 0;
  private _username = "";
  private _email = "";

  constructor() {
    makeAutoObservable(this);
    this.refresh();
  }

  get userId() {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get username() {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
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
    } else {
      this.userId = data.id;
      this.email = data.email;
      this.username = data.username;

      return "";
    }
  }

  async refresh(): Promise<string> {
    const data = await api.fetchRefresh();

    if (data.errorMessage) {
      console.error("Login error", data.errorMessage);
      return data.errorMessage;
    } else {
      this.email = data.email;
      this.userId = data.id;
      this.username = data.username;
      return "";
    }
  }

  async logout() {
    const data = await api.fetchRevoke();
    console.log(data);
    if (!data.errorMessage) {
      this.userId = 0;
      this.username = "";
      this.email = "";
    }
  }
}
