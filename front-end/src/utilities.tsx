import axios from "axios";

export interface User {
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
}

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

// TODO: Check for cookie fixes
export const signupUser = async (
  email: string,
  password: string
): Promise<User | void> => {
  try {
    const response = await api.post("users/signup/", {
      email: email,
      password: password,
    });

    if (response.status === 201) {
      const data: User = response.data;
      return data;
    } else {
      console.log("signup error");
      return; // Return undefined if signup fails
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return; // Return undefined if an error occurs
  }
};

// TODO: Check for cookie fixes
export const userLogin = async (
  email: string,
  password: string
): Promise<User | void> => {
  try {
    const response = await api.post("users/login/", {
      email: email,
      password: password,
    });

    if (response.status === 201) {
      const data: User = response.data;
      return data;
    } else {
      console.log("login error");
      return; // Return undefined if login fails
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return; // Return undefined if an error occurs
  }
};

// TODO: Check for cookie fixes
export const userLogout = async (): Promise<boolean> => {
  try {
    const response = await api.post("users/logout/");
    if (response.status === 204) {
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
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    try {
      const response = await api.get("users/");
      if (response.status === 200) {
        const data: User = response.data;
        return data;
      } else {
        console.log("Error userConfirmation:", response);
        return null;
      }
    } catch (error) {
      console.error("Error userConfirmation:", error);
      return null;
    }
  } else {
    console.log("No token in localStorage for userConfirmation");
    return null;
  }
};
