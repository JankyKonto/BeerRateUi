import { makeAutoObservable } from "mobx";
import { store } from "./Store";

export class LoginPageStore {
  private _email = "";
  private _password = "";
  private _isResetPasswordModalShown = false;
  private _resetEmail = "";
  private _errorMessage = "";

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

  get isResetPasswordModalShown() {
    return this._isResetPasswordModalShown;
  }

  set isResetPasswordModalShown(value: boolean) {
    this._isResetPasswordModalShown = value;
  }

  get resetEmail() {
    return this._resetEmail;
  }

  set resetEmail(value: string) {
    this._resetEmail = value;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  async login() {
    if (this.email && this.password) {
      this._errorMessage = await store.authStore.login(
        this.email,
        this.password
      );
    }
  }

  sendPasswordResetRequest() {}
}
