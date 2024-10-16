import { makeAutoObservable } from "mobx";
import { AuthStore } from "./AuthStore";

export class Store {
  authStore = new AuthStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
