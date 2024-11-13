import { makeAutoObservable } from "mobx";
import { AuthStore } from "./AuthStore";
import { RegisterPageStore } from "./RegisterPageStore";
import { LoginPageStore } from "./LoginPageStore";
import { AddBeerPageStore } from "./AddBeerPageStore";
import { BeerStore } from "./BeerStore";
import { BeerInfoStore } from "./BeerInfoStore";
import { ReviewsStore } from "./ReviewsStore";

export class Store {
  registerPageStore = new RegisterPageStore();
  loginPageStore = new LoginPageStore();
  authStore = new AuthStore();
  addBeerPageStore = new AddBeerPageStore();
  beerStore = new BeerStore();
  beerInfoStore = new BeerInfoStore();
  reviewsStore = new ReviewsStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
