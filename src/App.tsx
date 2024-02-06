import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useReducer } from "react";
import { InitialState, REDUCER_ACTION, REDUCER_TYPE } from "../types/model";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const App = () => {
  const initialState: InitialState = {
    cities: [],
    isLoading: false,
  };

  function reducer(
    state: typeof initialState,
    action: REDUCER_TYPE
  ): typeof initialState {
    switch (action.type) {
      case REDUCER_ACTION.CITIES:
        return { ...state, cities: action.payload?.data };
      case REDUCER_ACTION.LOADING:
        return { ...state, isLoading: action.payload?.loading };

      default:
        throw new Error("This code is never to be reached.");
    }
  }
  const [{ cities, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function cityData() {
      try {
        dispatch({ type: REDUCER_ACTION.LOADING, payload: { loading: true } });
        const res = await fetch(`${REDUCER_ACTION.ENDPOINT}cities`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("The data couldn't be fetched");
        const data = await res.json();

        dispatch({ type: REDUCER_ACTION.CITIES, payload: { data } });
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        dispatch({ type: REDUCER_ACTION.LOADING, payload: { loading: false } });
      }
    }

    cityData();

    return () => controller.abort();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City />} />

            <Route
              path="country"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
