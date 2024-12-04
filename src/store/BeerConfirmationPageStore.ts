import { makeAutoObservable, runInAction } from "mobx";
import { Beer } from "../model";
import { api } from "../service/api";

export class BeerConfirmationPageStore {
  private _page = 1;
  private _pagesAmount = 0;
  private _beers: Beer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get page() {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
    this.fetch();
  }

  get pagesAmount() {
    return this._pagesAmount;
  }

  get beers() {
    return this._beers;
  }

  async fetch() {
    const data = await api.fetchBeerListToConfirm(this._page);
    if (!data.errorMessage) {
      runInAction(() => {
        this._beers = data.beers;
        this._pagesAmount = data.pages;
      });
    }
  }

  async confirm(beerId: number) {
    const data = await api.fetchConfirmBeer(beerId);
    if (!data.errorMessage) {
      if (this.beers.length === 1) {
        runInAction(() => {
          this._page--;
        });
      }
      await this.fetch();
    }
  }

  async reject(beerId: number) {
    const data = await api.fetchDeleteBeer(beerId);
    if (!data.errorMessage) {
      if (this.beers.length === 1) {
        runInAction(() => {
          this._page--;
        });
      }
      await this.fetch();
    }
  }
}
