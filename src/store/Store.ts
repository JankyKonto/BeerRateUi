import { makeAutoObservable } from "mobx";
import { AuthStore } from "./AuthStore";
import { RegisterPageStore } from "./RegisterPageStore";
import { LoginPageStore } from "./LoginPageStore";
import { AddBeerPageStore } from "./AddBeerPageStore";
import { BeerInfoStore } from "./BeerInfoStore";
import { ReviewsStore } from "./ReviewsStore";
import { BeerListPageStore } from "./BeerListPageStore";
import { BeerConfirmationPageStore } from "./BeerConfirmationPageStore";

export class Store {
  registerPageStore = new RegisterPageStore();
  loginPageStore = new LoginPageStore();
  authStore = new AuthStore();
  addBeerPageStore = new AddBeerPageStore();
  beerListPageStore = new BeerListPageStore();
  beerInfoStore = new BeerInfoStore();
  reviewsStore = new ReviewsStore();
  beerConfirmationPageStore = new BeerConfirmationPageStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
