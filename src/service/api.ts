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
      throw new Error(data.errorMessage || "Fetch error occured");
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

      return {
        username: data.username,
      };
    } catch (error) {
      console.error(error);
      return {
        username: "",
        errorMessage: "Error in fetchRegister",
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

      return {
        id: data.id,
        username: data.username,
        email: data.email,
      };
    } catch (error) {
      console.error(error);
      return {
        id: 0,
        username: "",
        email: "",
        errorMessage: "Error in fetchLogin",
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
      return {
        id: data.id,
        username: data.username,
        email: data.email,
      };
    } catch (error) {
      console.error(error);
      return {
        id: 0,
        username: "",
        email: "",
        errorMessage: "Error in fetchLogin",
      };
    }
  }
}

export const api = new Api();
