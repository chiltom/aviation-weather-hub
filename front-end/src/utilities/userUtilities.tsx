import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
import { User } from "../types/userTypes";
// All user related utility functions
// TODO: Implement cookie authentication for more secure auth method

/**
 * @description Signs a new user up for an account.
 *
 * @param {string} email The new user's email. Must be unique.
 * @param {string} password The new user's password.
 * @param {string} displayName The new user's display name.
 * @param {string} firstName The new user's first name.
 * @param {string} lastName The new user's last_name.
 *
 * @returns {Promise<User | null>} The User or null after resolution of the request.
 */
export const signupUser = async (
  email: string,
  password: string,
  displayName: string,
  firstName: string,
  lastName: string
): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.post("users/signup/", {
      email: email,
      password: password,
      display_name: displayName,
      first_name: firstName,
      last_name: lastName,
    });
    if (response.status === 201) {
      const user: User = {
        email: response.data["email"],
        displayName: response.data["display_name"],
        firstName: response.data["first_name"],
        lastName: response.data["last_name"],
      };
      return user;
    } else {
      console.log(response.data);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @description Logs in an existing user to their account.
 *
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 *
 * @returns {Promise<User | null>} The User or null after resolution of the request.
 */
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
        displayName: response.data["display_name"],
        firstName: response.data["first_name"],
        lastName: response.data["last_name"],
      };
      return user;
    } else {
      console.log(response.data);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * @description Logs out a user and flushes their session.
 *
 * @returns {Promise<boolean>} True or false depending on the resolution of the request.
 */
export const userLogout = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse = await api.post("users/logout/");
    if (response.status === 204) {
      return true;
    } else {
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * @description Confirms if a user is currently logged in or not.
 *
 * @returns {Promise<User | null>} The User or null after resolution of the request.
 */
export const userConfirmation = async (): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.get("users/");
    if (response.status === 200) {
      const user: User = {
        email: response.data["email"],
        displayName: response.data["display_name"],
        firstName: response.data["first_name"],
        lastName: response.data["last_name"],
      };
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * @description Changes a user's display name.
 *
 * @param {string} displayName The user's new display name.
 *
 * @returns {Promise<User | null>} The User or null after resolution of the request.
 */
export const changeUserInfo = async (
  displayName: string
): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.put("users/", {
      display_name: displayName,
    });
    if (response.status === 200) {
      const updatedUser: User | null = await userConfirmation();
      return updatedUser;
    } else {
      console.log(response.status, response.data);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
