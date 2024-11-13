import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../service/api";
import { Review } from "../model";

export class ReviewsStore {
  private _reviews: Review[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get reviews() {
    return this._reviews;
  }

  async fetch(beerId: number) {
    const data = await api.fetchBeerReviews(beerId, 0, 100);
    if (!data.errorMessage) {
      runInAction(() => {
        this._reviews = data.reviews;
      });
    }
  }
}
