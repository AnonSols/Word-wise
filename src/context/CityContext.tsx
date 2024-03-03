import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  AddCityProp,
  InitialState,
  REDUCER_ACTION,
  REDUCER_TYPE,
  sample,
} from "../types/cityModel";

export type sampleProp = typeof sample;

const initialState: InitialState = {
  cities: [],
  isLoading: false,
  currentCity: {} as sampleProp,
  rejected: "",
};

type CityContextProp = {
  cities: sampleProp[] | undefined;
  isLoading: boolean | undefined;
  rejected: string;
  dispatch: React.Dispatch<REDUCER_TYPE>;
  getCity(id: string): Promise<void>;
  addCity(newCity: AddCityProp): Promise<void>;
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
          cities: action.payload?.data ? action.payload?.data : [],
          isLoading: false,
        };

      case REDUCER_ACTION.REJECTED:
        return {
          ...state,
          rejected: action.payload?.rejected ? action.payload?.rejected : "",
          isLoading: false,
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
          isLoading: false,
        };

      case REDUCER_ACTION.ADD_CITY:
        return {
          ...state,
          cities: [...state.cities, state.currentCity],
          isLoading: false,
        };

      case REDUCER_ACTION.REMOVE_CITY:
        return {
          ...state,
          cities: state.cities?.filter(
            (city) => city.id !== action.payload?.id
          ),
          isLoading: false,
        };

      default:
        throw new Error("This code is never to be reached.");
    }
  }

  const [{ cities, isLoading, currentCity, rejected }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const controller = new AbortController();

    async function cityData() {
      dispatch({
        type: REDUCER_ACTION.LOADING,
        payload: { loading: true },
      });
      try {
        const res = await fetch(`${REDUCER_ACTION.ENDPOINT}cities`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("The data couldn't be fetched");
        const data = await res.json();
        console.log(data);
        dispatch({
          type: REDUCER_ACTION.CITIES,
          payload: { data },
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError")
          console.log((error as Error).message);
        dispatch({
          type: REDUCER_ACTION.REJECTED,
          payload: { rejected: "There was an error getting cities!" },
        });
      }
    }

    cityData();

    return () => controller.abort();
  }, []);

  async function getCity(id: string) {
    dispatch({
      type: REDUCER_ACTION.LOADING,
      payload: { loading: true },
    });
    try {
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
      dispatch({
        type: REDUCER_ACTION.REJECTED,
        payload: {
          rejected: "There was an error getting the current city",
        },
      });
    }
  }

  async function addCity({ newCity }: AddCityProp) {
    dispatch({
      type: REDUCER_ACTION.LOADING,
      payload: { loading: true },
    });
    try {
      const res = await fetch(`${REDUCER_ACTION.ENDPOINT}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("The data couldn't be fetched");
      const data = await res.json();
      dispatch({
        type: REDUCER_ACTION.ADD_CITY,
        payload: { currentCity: data },
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        console.log((error as Error).message);
      dispatch({
        type: REDUCER_ACTION.REJECTED,
        payload: {
          rejected: "There was an error adding this city",
        },
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
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        console.log((error as Error).message);
      dispatch({
        type: REDUCER_ACTION.REJECTED,
        payload: {
          rejected: "There was an error deleting this current city",
        },
      });
    }
  }

  return (
    <cityContext.Provider
      value={{
        dispatch,
        isLoading,
        rejected,
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
