export type User = {
  id: string;
  username: string;
  password: string;
  email: string | null;
  picture: string | null;
};

export type SafeUser = Omit<User, "password">;
