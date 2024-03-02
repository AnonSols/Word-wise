import { createContext, useContext, useReducer } from "react";
import {
  InitialStateProp,
  ProviderProp,
  REDUCER_AUTH_ACTION,
  ContextProp,
  REDUCER_AUTH_TYPE,
} from "../types/authModel";

const AuthContex = createContext<ContextProp | undefined>(undefined);

const InitialState: InitialStateProp = {
  isAuth: false,
  user: null,
};

function AuthProvider({ children }: ProviderProp) {
  function reducer(
    state: typeof InitialState,
    action: REDUCER_AUTH_TYPE
  ): typeof InitialState {
    switch (action.type) {
      case REDUCER_AUTH_ACTION.LOGIN:
        return {
          ...state,
          isAuth: true,
          user: {
            email: action.payload.user?.email ? action.payload.user?.email : "",
            password: action.payload.user?.password
              ? action.payload.user?.password
              : "",
          },
        };
      case REDUCER_AUTH_ACTION.LOGOUT:
        return {
          ...state,
          isAuth: false,
          user: null,
        };

      default:
        throw new Error("An error Occured");
    }
  }
  const [{ isAuth, user }, dispatch] = useReducer(reducer, InitialState);

  return (
    <AuthContex.Provider value={{ dispatch, isAuth, user }}>
      <>{children}</>
    </AuthContex.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContex);

  if (context == undefined)
    throw new Error("Context was used outside of a provider");

  return context;
}

export { AuthProvider, useAuth };
