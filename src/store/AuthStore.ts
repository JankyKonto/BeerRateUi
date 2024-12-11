import { makeAutoObservable, runInAction } from "mobx";
import { api, LoginResponse, RegisterResponse } from "../service/api";

export class AuthStore {
  private _userId = 0;
  private _username = "";
  private _email = "";
  private _isAdmin = false;

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

  get isAdmin() {
    return this._isAdmin;
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<string> {
    const data: RegisterResponse = await api.postRegister(
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
    const data: LoginResponse = await api.postLogin(email, password);

    if (data.errorMessage) {
      console.error("Login error", data.errorMessage);
      return data.errorMessage;
    } else {
      this.userId = data.id;
      this.email = data.email;
      this.username = data.username;
      runInAction(() => {
        this._isAdmin = data.isUserAdmin;
      });
      return "";
    }
  }

  async refresh(): Promise<string> {
    const data = await api.postRefresh();

    if (data.errorMessage) {
      console.error("Login error", data.errorMessage);
      return data.errorMessage;
    } else {
      this.email = data.email;
      this.userId = data.id;
      this.username = data.username;
      runInAction(() => {
        this._isAdmin = data.isUserAdmin;
      });
      return "";
    }
  }

  async logout(): Promise<boolean> {
    const data = await api.deleteRevoke();
    console.log(data);
    if (!data.errorMessage) {
      this.userId = 0;
      this.username = "";
      this.email = "";
      return true;
    }

    return false;
  }
}
