import { makeAutoObservable } from "mobx";
import { api } from "../service/api";

export class AddBeerPageStore {
  private _name = "";
  private _producer = "";
  private _kind = "";
  private _originCountry = "";
  private _alcoholAmount: number | null = null;
  private _ibu: number | null = null;
  private _beerImage: File | null = null;
  private _errorMessage = "";
  private _isInfoAlertVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._errorMessage = "";
    this._name = value;
  }

  get producer(): string {
    return this._producer;
  }

  set producer(value: string) {
    this._errorMessage = "";
    this._producer = value;
  }

  get kind(): string {
    return this._kind;
  }

  set kind(value: string) {
    this._errorMessage = "";
    this._kind = value;
  }

  get originCountry(): string {
    return this._originCountry;
  }

  set originCountry(value: string) {
    this._errorMessage = "";
    this._originCountry = value;
  }

  get alcoholAmount(): number | null {
    return this._alcoholAmount;
  }

  set alcoholAmount(value: number | null) {
    this._errorMessage = "";
    this._alcoholAmount = value;
  }

  get ibu(): number | null {
    return this._ibu;
  }

  set ibu(value: number | null) {
    this._errorMessage = "";
    this._ibu = value;
  }

  get beerImage() {
    return this._beerImage;
  }

  set beerImage(value: File | null) {
    this._errorMessage = "";
    this._beerImage = value;
  }

  get previewUrl(): string | null {
    return this._beerImage ? URL.createObjectURL(this._beerImage) : null;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get isInfoAlertVisible() {
    return this._isInfoAlertVisible;
  }

  async submit() {
    this._errorMessage = "";
    if (this.ibu && this.beerImage && this.alcoholAmount) {
      const formData = new FormData();

      formData.append("name", this.name);
      formData.append("producer", this.producer);
      formData.append("kind", this.kind);
      formData.append("originCountry", this.originCountry);
      formData.append("alcoholAmount", this.alcoholAmount.toString());
      formData.append("ibu", this.ibu.toString());
      formData.append("beerImage", this.beerImage);

      const data = await api.fetchAddBeer(formData);

      if (data.errorMessage) {
        this._errorMessage = data.errorMessage;
      } else {
        this.openInfoAlert();
      }
    }
  }

  openInfoAlert() {
    this._isInfoAlertVisible = true;

    setTimeout(() => {
      this._isInfoAlertVisible = false;
    }, 5000);
  }
}
