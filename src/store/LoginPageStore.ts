import { makeAutoObservable } from "mobx";
import { store } from "./Store";

export class LoginPageStore {
  private _email = "";
  private _password = "";

  constructor() {
    makeAutoObservable(this);
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  submit() {
    if (this.email && this.password) {
      store.authStore.login(this.email, this.password);
    }
  }
}
