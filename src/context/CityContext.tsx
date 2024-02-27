import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  AddCityProp,
  InitialState,
  REDUCER_ACTION,
  REDUCER_TYPE,
  sample,
} from "../types/model";

export type sampleProp = typeof sample;

const initialState: InitialState = {
  cities: [],
  isLoading: false,
  currentCity: {} as sampleProp,
};

type CityContextProp = {
  cities: sampleProp[] | undefined;
  isLoading: boolean | undefined;
  dispatch: React.Dispatch<REDUCER_TYPE>;
  getCity(id: string): Promise<void>;
  addCity(newCity: AddCityProp): void;
  currentCity: sampleProp;
  deleteCity(id: string): void;
  convertToEmoji(countryCode: string): string;
};

const cityContext = createContext<CityContextProp | undefined>(undefined);

function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(Number(char)));

  return String.fromCodePoint(...codePoints);
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
  function reducer(
    state: typeof initialState,
    action: REDUCER_TYPE
  ): typeof initialState {
    switch (action.type) {
      case REDUCER_ACTION.CITIES:
        return {
          ...state,
          cities: action.payload?.data,
        };
      case REDUCER_ACTION.LOADING:
        return {
          ...state,
          isLoading: action.payload?.loading,
        };

      case REDUCER_ACTION.CURRENT_CITY:
        return {
          ...state,
          currentCity: action.payload?.currentCity
            ? action.payload.currentCity
            : state.currentCity,
        };
      case REDUCER_ACTION.REMOVE_CITY:
        return {
          ...state,
          cities: state.cities?.filter((city) => {
            action.payload?.id ? city.id !== action.payload?.id : city;
          }),
        };

      default:
        throw new Error("This code is never to be reached.");
    }
  }

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const controller = new AbortController();

    async function cityData() {
      try {
        dispatch({
          type: REDUCER_ACTION.LOADING,
          payload: { loading: true },
        });

        const res = await fetch(`${REDUCER_ACTION.ENDPOINT}cities`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("The data couldn't be fetched");
        const data = await res.json();

        dispatch({
          type: REDUCER_ACTION.CITIES,
          payload: { data },
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError")
          console.log((error as Error).message);
      } finally {
        dispatch({
          type: REDUCER_ACTION.LOADING,
          payload: { loading: false },
        });
      }
    }

    cityData();

    return () => controller.abort();
  }, []);

  async function getCity(id: string) {
    try {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: true },
      });

      const res = await fetch(`${REDUCER_ACTION.ENDPOINT}cities/${id}`);

      if (!res.ok) throw new Error("The data couldn't be fetched");
      const data = await res.json();
      dispatch({
        type: REDUCER_ACTION.CURRENT_CITY,
        payload: { currentCity: data },
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        console.log((error as Error).message);
    } finally {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: false },
      });
    }
  }

  async function addCity({ newCity }: AddCityProp) {
    try {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: true },
      });
      const res = await fetch(`${REDUCER_ACTION.ENDPOINT}cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("The data couldn't be fetched");
      const data = await res.json();
      dispatch({
        type: REDUCER_ACTION.CURRENT_CITY,
        payload: { currentCity: data },
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        console.log((error as Error).message);
    } finally {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: false },
      });
    }
  }

  async function deleteCity(id: string) {
    try {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: true },
      });
      await fetch(`${REDUCER_ACTION.ENDPOINT}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: REDUCER_ACTION.REMOVE_CITY,
        payload: { id },
      });
      // cities?.filter((city) => city.id !== id);
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        console.log((error as Error).message);
    } finally {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: false },
      });
    }
  }

  return (
    <cityContext.Provider
      value={{
        dispatch,
        isLoading,
        cities,
        getCity,
        addCity,
        deleteCity,
        currentCity,
        convertToEmoji,
      }}
    >
      <> {children}</>
    </cityContext.Provider>
  );
}

function useCity() {
  const contextValue = useContext(cityContext);

  if (contextValue === undefined)
    throw new Error("Context was used outside a the city provider");

  return contextValue;
}
export { CitiesProvider, useCity };
