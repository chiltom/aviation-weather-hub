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
