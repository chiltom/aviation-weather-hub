import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";

/**
 * ContextType provides a type for the context that will be inserted
 * into and loaded from outlet context throughout the router provider.
 *
 * It consists of the user and setUser pair that may contain a User object
 * or null value, the setUser setter for user, and the theme of the client's
 * OS.
 */
export type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  theme: string;
};

// All user related utility functions
// TODO: Implement cookie authentication for more secure auth method

/**
 * The User interface consists of an email, display name, first name,
 * and last name, effectively holding all relevant user information
 * stored in the server
 */
export interface User {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

/**
 * This function sends a post request to the server to sign up a
 * user for the service.
 *
 * If the arguments are valid, the user is created by the server
 * and returned along with a new token for the session. The token
 * is then added to localStorage and the appropriate Authorization
 * header with the token value is set. Finally, a User object is
 * returned from the function.
 *
 * If the arguments are invalid, a null value is returned.
 *
 * @param email - The new user's email
 * @param password - The new user's password
 * @param displayName - The new user's display name
 * @param firstName - The new user's first name
 * @param lastName - The new user's last_name
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
      localStorage.setItem("token", response.data["token"]);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data["token"]}`;
      return user;
    } else {
      console.log(response.data);
      return null; // Return undefined if signup fails
    }
  } catch (error) {
    console.error(error);
    return null; // Return undefined if an error occurs
  }
};

/**
 * This function takes an existing user's email and password and
 * sends the credentials to the server for authentication.
 *
 * If the user is authenticated, their information is returned with
 * a token. The token is then added to the client's localStorage and
 * the proper Authorization header with the token value is set. Finally,
 * a User object is returned from the function.
 *
 * If the user is not authenticated, the server throws a bad response
 * and this function returns null.
 *
 * @param email
 * @param password
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
      localStorage.setItem("token", response.data["token"]);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data["token"]}`;
      return user;
    } else {
      console.log(response.data);
      return null; // Return undefined if login fails
    }
  } catch (error) {
    console.error(error);
    return null; // Return undefined if an error occurs
  }
};

/**
 * No arguments are passed to this function, and instead a post
 * request is sent to the server and it is validated with the
 * user's token.
 *
 * If the user's token is authenticated the server validates the
 * request and ends the current user's session. The 204 response
 * is sent back and this function deletes the user's token. This
 * ultimately returns a true value from this function upon deletion.
 *
 * If the user is not authenticated already, the token does not
 * exist and the server throws an error. The function then returns
 * a false value indicating that the logout request failed.
 */
export const userLogout = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      console.log("user logged out");
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
 * This function attempts to grab a user's token from local storage
 * and use its value. If the token exists, a get request is sent to
 * the server for the user.
 *
 * If the user is authenticated with the token the server returns
 * the users information and this function returns the User object.
 *
 * If the token does not exist, this function returns a null value.
 */
export const userConfirmation = async (): Promise<User | null> => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
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
  }
  return null;
};

/**
 * This function takes the user's new display name as an argument
 * and sends a put request with the user's token to the server.
 *
 * If the server authenticates the user and accepts the argument, it
 * then uses the userConfirmation function to ensure that the user's
 * updated data is grabbed from the server.
 *
 * Finally, the function will return the User object that is returned
 * from the userConfirmation.
 *
 * If the server does not authenticate the user, the server returns an
 * error and this function returns a null value.
 * @param displayName
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
      console.log(updatedUser);
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
