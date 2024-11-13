import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./Store";

export class RegisterPageStore {
  private _username = "";
  private _email = "";
  private _password = "";
  private _repeatedPassword = "";
  private _errorMessage = "";
  private _isLoading = false;

  /*
  private _isUsernameValid = true;
  private _isEmailValid = true;
  private _isPasswordValid = true;
  private _isRepeatedPasswordValid = true;
  */

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    runInAction(() => {
      this._username = "";
      this._email = "";
      this._password = "";
      this._repeatedPassword = "";
      this._errorMessage = "";
      this._isLoading = false;
    });
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
    this._errorMessage = "";
  }

  set email(value: string) {
    this._email = value;
    this._errorMessage = "";
  }

  set password(value: string) {
    this._password = value;
    this._errorMessage = "";
  }

  set repeatedPassword(value: string) {
    this._repeatedPassword = value;
    this._errorMessage = "";
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get passwordsMatch() {
    return this._password === this._repeatedPassword;
  }

  get isLoading() {
    return this._isLoading;
  }

  verifyFields() {}

  async register() {
    if (this.username && this.email && this.password && this.passwordsMatch) {
      this._isLoading = true;
      this._errorMessage = await store.authStore.register(
        this.email,
        this.username,
        this.password
      );
      this._isLoading = false;
    }
  }
}
