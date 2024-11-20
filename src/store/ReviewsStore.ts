import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../service/api";
import { Review } from "../model";

export class ReviewsStore {
  private _beerId: number | undefined;
  private _selectedTasteRate = 0;
  private _selectedAromaRate = 0;
  private _selectedFoamRate = 0;
  private _selectedColorRate = 0;
  private _reviewText = "";
  private _errorMessage = "";
  private _pagesAmount = 0;
  private _currentPage = 1;

  private _reviews: Review[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get reviews() {
    return this._reviews;
  }

  get selectedTasteRate(): number {
    return this._selectedTasteRate;
  }

  set selectedTasteRate(value: number | null) {
    if (value === null) {
      this._selectedTasteRate = 0;
    } else {
      if (value >= 0 && value <= 5) {
        this._selectedTasteRate = value;
      } else {
        throw new Error("Taste rate must be between 0 and 5.");
      }
    }
  }

  get selectedAromaRate(): number {
    return this._selectedAromaRate;
  }

  set selectedAromaRate(value: number | null) {
    if (value === null) {
      this._selectedTasteRate = 0;
    } else {
      if (value >= 0 && value <= 5) {
        this._selectedAromaRate = value;
      } else {
        throw new Error("Aroma rate must be between 0 and 5.");
      }
    }
  }

  get selectedFoamRate(): number {
    return this._selectedFoamRate;
  }

  set selectedFoamRate(value: number | null) {
    if (value === null) {
      this._selectedTasteRate = 0;
    } else {
      if (value >= 0 && value <= 5) {
        this._selectedFoamRate = value;
      } else {
        throw new Error("Foam rate must be between 0 and 5.");
      }
    }
  }

  get selectedColorRate(): number {
    return this._selectedColorRate;
  }

  set selectedColorRate(value: number | null) {
    if (value === null) {
      this._selectedTasteRate = 0;
    } else {
      if (value >= 0 && value <= 5) {
        this._selectedColorRate = value;
      } else {
        throw new Error("Color rate must be between 0 and 5.");
      }
    }
  }

  get reviewText(): string {
    return this._reviewText;
  }

  set reviewText(value: string) {
    this._reviewText = value;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }

  get pagesAmount() {
    return this._pagesAmount;
  }

  set currentPage(value: number) {
    this._currentPage = value;
    if (this._beerId) {
      this.fetch(this._beerId);
    }
  }

  async fetch(beerId: number) {
    const data = await api.fetchBeerReviews(beerId, this._currentPage);
    const pagesCountData = await api.fetchBeerReviewPagesCount(beerId);
    if (!data.errorMessage && !pagesCountData.errorMessage) {
      runInAction(() => {
        this._beerId = beerId;
        this._reviews = data.reviews;
        this._pagesAmount = pagesCountData.pagesAmount;
      });
    }
  }

  async postReview() {
    if (this._beerId) {
      const data = await api.postBeerReview(
        this._beerId,
        this._reviewText,
        this._selectedTasteRate,
        this._selectedAromaRate,
        this._selectedFoamRate,
        this._selectedColorRate
      );

      if (data.errorMessage) {
        this.errorMessage = data.errorMessage;
      } else {
        await this.fetch(this._beerId);
      }
    }
  }
}
