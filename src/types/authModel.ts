import { ReactNode } from "react";

export enum REDUCER_AUTH_ACTION {
  LOGIN,
  LOGOUT,
}

export interface REDUCER_AUTH_TYPE {
  type: REDUCER_AUTH_ACTION;
  payload: {
    isAuth: boolean;
    user: null | userProp;
  };
}

export type ProviderProp = {
  children: ReactNode;
};

export type userProp = {
  email: string;
  password: string;
};

export type InitialStateProp = {
  isAuth: boolean;
  user: userProp | null;
};
export type ContextProp = {
  dispatch: React.Dispatch<REDUCER_AUTH_TYPE>;
  isAuth: boolean;
  user: null | userProp;
};
