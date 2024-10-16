import { makeAutoObservable } from "mobx";
import { AuthStore } from "./AuthStore";
import { RegisterPageStore } from "./RegisterPageStore";
import { LoginPageStore } from "./LoginPageStore";

export class Store {
  registerPageStore = new RegisterPageStore();
  loginPageStore = new LoginPageStore();
  authStore = new AuthStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
