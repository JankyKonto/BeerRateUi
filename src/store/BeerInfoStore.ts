import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../service/api";
import { getImageUrl } from "../utils/imageHelpers";
import { BEER_KINDS, COUNTRIES } from "../utils/data";

export class BeerInfoStore {
  private _id = 0;
  private _name = "";
  private _producer = "";
  private _kindId = 0;
  private _originCountryCode = "";
  private _alcoholAmount = 0;
  private _ibu = 0;
  private _isLoading = false;
  private _image = "";

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

  get imageUrl() {
    return getImageUrl(this._image);
  }

  get ibu() {
    return this._ibu;
  }

  get isLoading() {
    return this._isLoading;
  }

  async fetch(beerId: number) {
    this._isLoading = true;
    const data = await api.fetchBeer(beerId);
    if (!data.errorMessage) {
      runInAction(() => {
        this._id = data.id;
        this._name = data.name;
        this._producer = data.producer;
        this._kindId = data.kind;
        this._originCountryCode = data.originCountry;
        this._alcoholAmount = data.alcoholAmount;
        this._ibu = data.ibu;
        this._image = data.image;
      });
    }
    this._isLoading = false;
  }
}
