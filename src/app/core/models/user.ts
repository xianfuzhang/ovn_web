export interface User {
  userName: string;
  password?: string;
  group?: string;
}

export interface UserModel {
  user_name: string;
  password?: string;
  groups: string[];
}

export interface UserRes {
  users: UserModel[];
}
