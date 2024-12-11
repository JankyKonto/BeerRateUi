import { Beer, Review } from "../model";
import { BeerFilterType } from "../store/BeerListPageStore";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RegisterResponse {
  username: string;
  errorMessage?: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  isUserAdmin: boolean;
  errorMessage?: string;
}

export interface ErrorResponse {
  errorMessage?: string;
}

export interface BeerListResponse {
  beers: Beer[];
  pages: number;
  errorMessage?: string;
}

export interface SimilarBeerListResponse {
  beers: Beer[];
  errorMessage?: string;
}

export interface BeerResponse {
  id: number;
  name: string;
  producer: string;
  kind: number;
  originCountry: string;
  alcoholAmount: number;
  ibu: number;
  image: string;
  errorMessage?: string;
}

export interface ReviewPagesAmountResponse {
  pagesAmount: number;
  errorMessage?: string;
}

export interface ReviewsListResponse {
  reviews: Review[];
  errorMessage?: string;
}

export interface PostBeerReviewResponse {
  username: string;
  errorMessage?: string;
}

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const BACKEND_URL = "https://localhost:7280/api";

export class Api {
  async fetchFromApi<T>(
    path: string,
    method: FetchMethod,
    body?: object
  ): Promise<T> {
    const response = await fetch(`${BACKEND_URL}/${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Fetch error occured");
    }
  }

  async fetchFormDataFromApi<T>(
    path: string,
    method: FetchMethod,
    formData: FormData
  ): Promise<T> {
    const response = await fetch(`${BACKEND_URL}/${path}`, {
      method: method,
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Fetch error occured");
    }
  }

  async postRegister(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> {
    try {
      const data = await this.fetchFromApi<RegisterResponse>(
        "User/register",
        "POST",
        {
          username,
          email,
          password,
        }
      );

      return data;
    } catch (error: any) {
      console.error(error);
      return {
        username: "",
        errorMessage: error.message || "Error in fetchRegister",
      };
    }
  }

  async postLogin(email: string, password: string): Promise<LoginResponse> {
    try {
      const data = await this.fetchFromApi<LoginResponse>(
        "User/login",
        "POST",
        {
          email,
          password,
        }
      );

      return data;
    } catch (error: any) {
      console.error(error);
      return {
        id: 0,
        username: "",
        email: "",
        isUserAdmin: false,
        errorMessage: error.message || "Error in fetchLogin",
      };
    }
  }

  async postRefresh(): Promise<LoginResponse> {
    try {
      const data = await this.fetchFromApi<LoginResponse>(
        "User/refresh",
        "POST",
        {}
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        id: 0,
        username: "",
        email: "",
        isUserAdmin: false,
        errorMessage: error.message || "Error in fetchLogin",
      };
    }
  }

  async postRemindPassword(email: string): Promise<ErrorResponse> {
    try {
      const data = await this.fetchFromApi<ErrorResponse>(
        "User/remind-password",
        "POST",
        {
          email: email,
        }
      );

      return data;
    } catch (error: any) {
      console.error(error);
      return {
        errorMessage: error.message || "Error in fetchRemindPassword",
      };
    }
  }

  async deleteRevoke(): Promise<ErrorResponse> {
    try {
      await this.fetchFromApi("User/revoke", "DELETE", {});
      return {};
    } catch (error: any) {
      console.error("fetchRevoke error", error);
      return {
        errorMessage: error.message || "Error in fetchRevoke",
      };
    }
  }

  async postAddBeer(formData: FormData): Promise<ErrorResponse> {
    try {
      await this.fetchFormDataFromApi(`Beer/add`, "POST", formData);
      return {};
    } catch (error: any) {
      console.error(error);
      return {
        errorMessage: error.message || "Error in fetchAddBeer",
      };
    }
  }

  async getBeerList(
    page: number,
    filter?: BeerFilterType
  ): Promise<BeerListResponse> {
    const filterQuery = filter
      ? Object.entries(filter)
          .filter(
            ([_, value]) =>
              value !== null && value !== undefined && value !== ""
          )
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";

    try {
      const data = await this.fetchFromApi<BeerListResponse>(
        `Beer/beers?page=${page}&${filterQuery}`,
        "GET"
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        beers: [],
        pages: 0,
        errorMessage: error.message || "Error in fetchBeerList",
      };
    }
  }

  async getBeerListToConfirm(page: number): Promise<BeerListResponse> {
    try {
      const data = await this.fetchFromApi<BeerListResponse>(
        `Beer/unconfirmed?page=${page}`,
        "GET"
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        beers: [],
        pages: 0,
        errorMessage: error.message || "Error in fetchBeerList",
      };
    }
  }

  async postConfirmBeer(beerId: number): Promise<ErrorResponse> {
    try {
      await this.fetchFromApi(`Beer/${beerId}/confirm`, "POST", {});
      return {};
    } catch (error: any) {
      return {
        errorMessage: error.message || "Error in fetchConfirmBeer",
      };
    }
  }

  async deleteBeer(beerId: number): Promise<ErrorResponse> {
    try {
      await this.fetchFromApi(`Beer/${beerId}`, "DELETE", {});
      return {};
    } catch (error: any) {
      return {
        errorMessage: error.message || "Error in fetchDeleteBeer",
      };
    }
  }

  async getBeer(beerId: number): Promise<BeerResponse> {
    try {
      const data = await this.fetchFromApi<BeerResponse>(
        `Beer/${beerId}`,
        "GET"
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        id: 0,
        name: "",
        alcoholAmount: 0,
        producer: "",
        ibu: 0,
        kind: 0,
        image: "",
        originCountry: "",
        errorMessage: error.message || "Error in fetchBeerList",
      };
    }
  }

  async getBeerReviewPagesCount(
    beerId: number
  ): Promise<ReviewPagesAmountResponse> {
    try {
      const data = await this.fetchFromApi<ReviewPagesAmountResponse>(
        `BeerReview/pages-amount/${beerId}`,
        "GET"
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        pagesAmount: 0,
        errorMessage: error.message || "Error in fetchReviews",
      };
    }
  }

  async getBeerReviews(
    beerId: number,
    page: number
  ): Promise<ReviewsListResponse> {
    try {
      const data = await this.fetchFromApi<ReviewsListResponse>(
        `BeerReview/reviews/${beerId}?page=${page}`,
        "GET"
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        reviews: [],
        errorMessage: error.message || "Error in fetchReviews",
      };
    }
  }

  async postBeerReview(
    beerId: number,
    text: string,
    tasteRate: number,
    aromaRate: number,
    foamRate: number,
    colorRate: number
  ): Promise<PostBeerReviewResponse> {
    try {
      const data = await this.fetchFromApi<PostBeerReviewResponse>(
        "BeerReview/add",
        "POST",
        {
          beerId,
          text,
          tasteRate,
          aromaRate,
          foamRate,
          colorRate,
        }
      );

      return data;
    } catch (error: any) {
      console.error(error);
      return {
        username: "",
        errorMessage: error.message || "postBeerReview error",
      };
    }
  }

  async postRemindPasswordSendEmail(email: string): Promise<ErrorResponse> {
    try {
      await this.fetchFromApi("User/remind-password-send-email", "POST", {
        email: email,
      });
      return {};
    } catch (error: any) {
      return {
        errorMessage: error.message || "postRemindPasswordSendEmail error",
      };
    }
  }

  async postRealisePasswordReminding(
    newPassword: string,
    token: string
  ): Promise<ErrorResponse> {
    try {
      await this.fetchFromApi("User/realise-password-reminding", "POST", {
        newPassword: newPassword,
        token: token,
      });
      return {};
    } catch (error: any) {
      return {
        errorMessage: error.message || "postRealisePasswordReminding error",
      };
    }
  }

  async getSimilarBeers(beerId: number): Promise<SimilarBeerListResponse> {
    try {
      const data = await this.fetchFromApi<SimilarBeerListResponse>(
        `Beer/${beerId}/similar-beers`,
        "GET"
      );
      return data;
    } catch (error: any) {
      return {
        beers: [],
        errorMessage: error.message || "getSimilarBeers error",
      };
    }
  }

  getBeerImageUrl(beerId: number): string {
    return `${BACKEND_URL}/Beer/${beerId}/image`;
  }
}

export const api = new Api();
