import { makeAutoObservable, runInAction } from "mobx";
import { Beer } from "../model";
import { api } from "../service/api";
import { BeerKind, Country } from "../utils/data";
import _default from "@emotion/styled";

export type BeerFilterType = {
  name: string;
  producer: string;
  kind: number;
  originCountry: string;
  minAlcoholAmount: number;
  maxAlcoholAmount: number;
  minIbu: number;
  maxIbu: number;
  sortType: number;
  isAscending: boolean;
};

export class BeerListPageStore {
  private _page = 1;
  private _pagesAmount = 0;
  private _beers: Beer[] = [];
  private _filterType: BeerFilterType = {
    name: "",
    producer: "",
    kind: 0,
    originCountry: "",
    minAlcoholAmount: 0,
    maxAlcoholAmount: 100,
    minIbu: 0,
    maxIbu: 9999,
    sortType: 0,
    isAscending: false,
  };

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

  get filterType() {
    return this._filterType;
  }

  set name(value: string) {
    this._filterType.name = value;
  }

  set producer(value: string) {
    this._filterType.producer = value;
  }

  set kind(value: BeerKind | null) {
    if (value === null) {
      this._filterType.kind = 0;
    } else {
      this._filterType.kind = value.id;
    }
  }

  set originCountry(value: Country | null) {
    if (value === null) {
      this._filterType.originCountry = "";
    } else {
      this._filterType.originCountry = value.code;
    }
  }

  set minAlcoholAmount(value: number | null) {
    if (value === null) {
      this._filterType.minAlcoholAmount = 0;
    } else {
      this._filterType.minAlcoholAmount = value;
    }
  }

  set maxAlcoholAmount(value: number | null) {
    if (value === null) {
      this._filterType.maxAlcoholAmount = 0;
    } else {
      this._filterType.maxAlcoholAmount = value;
    }
  }

  set minIbu(value: number | null) {
    if (value === null) {
      this._filterType.minIbu = 0;
    } else {
      this._filterType.minIbu = value;
    }
  }

  set maxIbu(value: number | null) {
    if (value === null) {
      this._filterType.maxIbu = 0;
    } else {
      this._filterType.maxIbu = value;
    }
  }

  set sortType(value: number) {
    this._filterType.sortType = value;
  }

  set isAscending(value: boolean) {
    this._filterType.isAscending = value;
  }

  async fetch() {
    const data = await api.fetchBeerList(this._page, this._filterType);

    runInAction(() => {
      if (!data.errorMessage) {
        this._beers = data.beers;
        this._pagesAmount = data.pages;
      }
    });
  }

  filter() {
    runInAction(() => {
      this._page = 1;
    });

    this.fetch();
  }
}
