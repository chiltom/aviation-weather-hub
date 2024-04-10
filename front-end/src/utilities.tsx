import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define context types to be passed down
export type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  theme: string;
};

export interface User {
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
}

export const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

// TODO: Check for cookie fixes
export const signupUser = async (
  email: string,
  password: string,
  display_name: string,
  first_name: string,
  last_name: string
): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.post("users/signup/", {
      email: email,
      password: password,
      display_name: display_name,
      first_name: first_name,
      last_name: last_name,
    });
    if (response.status === 201) {
      const user: User = {
        email: response.data["email"],
        display_name: response.data["display_name"],
        first_name: response.data["first_name"],
        last_name: response.data["last_name"],
      };
      localStorage.setItem("token", response.data["token"]);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data["token"]}`;
      return user;
    } else {
      console.log("signup error");
      return null; // Return undefined if signup fails
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return null; // Return undefined if an error occurs
  }
};

// TODO: Check for cookie fixes
export const userLogin = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.post("users/login/", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      const user: User = {
        email: response.data["email"],
        display_name: response.data["display_name"],
        first_name: response.data["first_name"],
        last_name: response.data["last_name"],
      };
      localStorage.setItem("token", response.data["token"]);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data["token"]}`;
      return user;
    } else {
      console.log("login error");
      return null; // Return undefined if login fails
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return null; // Return undefined if an error occurs
  }
};

// TODO: Check for cookie fixes
export const userLogout = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      console.log("user logged out");
      return true;
    } else {
      console.log("user logout error");
      return false;
    }
  } catch (error) {
    console.error("Error logging out user:", error);
    return false;
  }
};

// TODO: Check for cookie fixes
export const userConfirmation = async (): Promise<User | null> => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response: AxiosResponse = await api.get("users/");
    if (response.status === 200) {
      const user: User = {
        email: response.data["email"],
        display_name: response.data["display_name"],
        first_name: response.data["first_name"],
        last_name: response.data["last_name"],
      };
      return user;
    }
  }
  return null;
};
