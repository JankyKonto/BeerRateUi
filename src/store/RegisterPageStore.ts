import { makeAutoObservable } from "mobx";
import { store } from "./Store";

export class RegisterPageStore {
  private _username = "";
  private _email = "";
  private _password = "";
  private _repeatedPassword = "";
  private _errorMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get repeatedPassword() {
    return this._repeatedPassword;
  }

  set username(value: string) {
    this._username = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set repeatedPassword(value: string) {
    this._repeatedPassword = value;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get passwordsMatch() {
    return this._password === this._repeatedPassword;
  }

  async register() {
    if (this.username && this.email && this.password && this.passwordsMatch) {
      this._errorMessage = await store.authStore.register(
        this.email,
        this.username,
        this.password
      );
    }
  }
}
