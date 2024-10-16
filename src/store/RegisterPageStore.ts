import { makeAutoObservable } from "mobx";
import { store } from "./Store";

export class RegisterPageStore {
  private _username = "";
  private _email = "";
  private _password = "";
  private _repeatedPassword = "";

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

  get passwordsMatch() {
    return this._password === this._repeatedPassword;
  }

  submit() {
    if (this.username && this.email && this.password && this.passwordsMatch) {
      store.authStore.register(this.email, this.username, this.password);
    }
  }
}
