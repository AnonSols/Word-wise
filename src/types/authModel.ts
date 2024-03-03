import { ReactNode } from "react";

export enum REDUCER_AUTH_ACTION {
  LOGIN,
  LOGOUT,
}

export const FAKE_USER = {
  NAME: "Jack",
  EMAIL: "jack@example.com",
  PASSWORD: "qwerty",
  AVATAR: "https://i.pravatar.cc/100?u=zz",
};
export interface REDUCER_AUTH_TYPE {
  type: REDUCER_AUTH_ACTION;
  payload?: userProp;
}

export type ProviderProp = {
  children: ReactNode;
};

export type userProp = typeof FAKE_USER;

export type InitialStateProp = {
  isAuth: boolean;
  user: userProp | null;
};
export type ContextProp = {
  dispatch: React.Dispatch<REDUCER_AUTH_TYPE>;
  isAuth: boolean;
  Login(email: string, password: string): void;
  Logout: () => void;
  user: null | userProp;
};
