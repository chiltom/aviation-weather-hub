/**
 * @description The User interface defines all of the properties of a User.
 *
 * @property {string} email - The User's email.
 * @property {string} displayName - The User's display name.
 * @property {string} firstName - The User's first name.
 * @property {string} lastName - The User's last name.
 */
export interface User {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

/**
 * @description ContextType provides a type for the context that will be inserted
 * into and loaded from outlet context throughout the router provider.
 *
 * @prop {User | null} user - The user state
 * @prop {React.Dispatch<React.SetStateAction<User | null>>} setUser - The user state setter
 * @prop {string} theme - The client OS's preferred theme.
 */
export type ContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  theme: string;
};
