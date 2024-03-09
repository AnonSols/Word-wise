import { createContext, useContext, useMemo, useReducer } from "react";
import {
  InitialStateProp,
  ProviderProp,
  REDUCER_AUTH_ACTION,
  ContextProp,
  REDUCER_AUTH_TYPE,
  FAKE_USER,
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
          user: action.payload ? action.payload : state.user,
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

  function Login(email: string, password: string) {
    if (!(email === FAKE_USER.EMAIL && password === FAKE_USER.PASSWORD)) return;

    dispatch({ type: REDUCER_AUTH_ACTION.LOGIN, payload: FAKE_USER });
  }

  function Logout() {
    dispatch({ type: REDUCER_AUTH_ACTION.LOGOUT });
  }
  const [{ isAuth, user }, dispatch] = useReducer(reducer, InitialState);

  const value = useMemo(() => {
    return { dispatch, isAuth, user, Login, Logout };
  }, [isAuth, user]);
  return (
    <AuthContex.Provider value={value}>
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
