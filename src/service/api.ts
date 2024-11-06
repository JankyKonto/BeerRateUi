import { Beer } from "../model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RegisterResponse {
  username: string;
  errorMessage?: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  errorMessage?: string;
}

export interface ErrorResponse {
  errorMessage?: string;
}

export interface BeerListResponse {
  beers: Beer[];
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

  async fetchRegister(
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

  async fetchLogin(email: string, password: string): Promise<LoginResponse> {
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
        errorMessage: error.message || "Error in fetchLogin",
      };
    }
  }

  async fetchRefresh(): Promise<LoginResponse> {
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
        errorMessage: error.message || "Error in fetchLogin",
      };
    }
  }

  async fetchRemindPassword(email: string): Promise<ErrorResponse> {
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

  async fetchRevoke(): Promise<ErrorResponse> {
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

  async fetchAddBeer(formData: FormData): Promise<ErrorResponse> {
    try {
      await this.fetchFormDataFromApi(`Beer/addbeer`, "POST", formData);
      return {};
    } catch (error: any) {
      console.error(error);
      return {
        errorMessage: error.message || "Error in fetchAddBeer",
      };
    }
  }

  async fetchBeerList(): Promise<BeerListResponse> {
    try {
      const data = await this.fetchFromApi<BeerListResponse>(
        "Beer/getbeers",
        "GET"
      );
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        beers: [],
        errorMessage: error.message || "Error in fetchBeerList",
      };
    }
  }
}

export const api = new Api();
