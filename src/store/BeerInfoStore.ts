import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../service/api";
import { BEER_KINDS, COUNTRIES } from "../utils/data";
import { Beer } from "../model";

export class BeerInfoStore {
  private _id = 0;
  private _name = "";
  private _producer = "";
  private _kindId = 0;
  private _originCountryCode = "";
  private _alcoholAmount = 0;
  private _ibu = 0;
  private _isLoading = false;

  private _avgTasteRate = 0;
  private _avgFoamRate = 0;
  private _avgAromaRate = 0;
  private _avgColorRate = 0;

  private _similarBeers: Beer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get producer() {
    return this._producer;
  }

  get kind() {
    return BEER_KINDS.find((k) => k.id === this._kindId)?.name;
  }

  get originCountry() {
    return COUNTRIES.find((c) => c.code === this._originCountryCode)?.name_pl;
  }

  get alcoholAmount() {
    return this._alcoholAmount;
  }

  get ibu() {
    return this._ibu;
  }

  get isLoading() {
    return this._isLoading;
  }

  get avgRate() {
    return (
      (this._avgAromaRate +
        this._avgColorRate +
        this._avgFoamRate +
        this._avgTasteRate) /
      8
    );
  }

  get avgTasteRate() {
    return this._avgTasteRate / 2;
  }

  get avgFoamRate() {
    return this._avgFoamRate / 2;
  }

  get avgAromaRate() {
    return this._avgAromaRate / 2;
  }

  get avgColorRate() {
    return this._avgColorRate / 2;
  }

  get similarBeers() {
    return this._similarBeers;
  }

  async fetch(beerId: number) {
    this._isLoading = true;
    const data = await api.getBeer(beerId);
    if (!data.errorMessage) {
      runInAction(() => {
        this._id = data.id;
        this._name = data.name;
        this._producer = data.producer;
        this._kindId = data.kind;
        this._originCountryCode = data.originCountry;
        this._alcoholAmount = data.alcoholAmount;
        this._ibu = data.ibu;
        this._avgTasteRate = data.tasteAverage;
        this._avgAromaRate = data.aromaAverage;
        this._avgFoamRate = data.foamAverage;
        this._avgColorRate = data.colorAverage;
      });
    }
    this._isLoading = false;
  }

  async fetchSimilarBeers(beerId: number) {
    //debugger;
    this._isLoading = true;
    this._similarBeers = [];
    const data = await api.getSimilarBeers(beerId);
    if (!data.errorMessage) {
      runInAction(() => {
        this._similarBeers = data.beers;
      });
    }
    this._isLoading = false;
  }
}
