import { makeAutoObservable } from "mobx";

export class AuthStore {
  private _userId = "";
  private _username = "";
  private _email = "";

  constructor() {
    makeAutoObservable(this);
  }

  get userId() {
    return this._userId;
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  get username() {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get isLoggedIn(): boolean {
    return !!(this.userId && this.username && this.email);
  }

  logout() {}
}
