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

const BACKEND_URL = "https://localhost:7280/api";

export class Api {
  async fetchRegister(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/User/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

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
      const response = await fetch(`${BACKEND_URL}/User/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

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
