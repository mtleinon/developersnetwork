interface User {
  id: string;
  name: string;
  avatar: string;
}
export interface AuthData {
  isAuthenticated: boolean;
  user: User;
}

export interface Auth {
  auth: AuthData;
}
