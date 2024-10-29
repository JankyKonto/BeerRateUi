import { makeAutoObservable } from "mobx";
import { AuthStore } from "./AuthStore";
import { RegisterPageStore } from "./RegisterPageStore";
import { LoginPageStore } from "./LoginPageStore";
import { AddBeerPageStore } from "./AddBeerPageStore";

export class Store {
  registerPageStore = new RegisterPageStore();
  loginPageStore = new LoginPageStore();
  authStore = new AuthStore();
  addBeerPageStore = new AddBeerPageStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
