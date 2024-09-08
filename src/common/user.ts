export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  sidebar_state?: boolean;
}
