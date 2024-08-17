export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  sidebar_state?: boolean;
}
