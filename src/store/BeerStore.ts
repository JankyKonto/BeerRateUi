import { makeAutoObservable } from "mobx";
import { api } from "../service/api";
import { Beer } from "../model";

export class BeerStore {
  private _beers: Beer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get beers() {
    console.log(this._beers);
    return this._beers;
  }

  async fetch() {
    const data = await api.getBeerList(1);

    if (!data.errorMessage) {
      this._beers = data.beers;
      console.log(this._beers);
    }
  }
}
