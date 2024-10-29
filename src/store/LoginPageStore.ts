import { makeAutoObservable } from "mobx";
import { store } from "./Store";

export class LoginPageStore {
  private _email = "";
  private _password = "";
  private _isResetPasswordModalShown = false;
  private _resetEmail = "";
  private _errorMessage = "";
  private _isLoading = false;

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

  get isLoading() {
    return this._isLoading;
  }

  async login() {
    if (this.email && this.password) {
      this._isLoading = true;
      this._errorMessage = await store.authStore.login(
        this.email,
        this.password
      );
      this._isLoading = false;
    }
  }

  sendPasswordResetRequest() {}
}
