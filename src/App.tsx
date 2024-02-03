import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useReducer } from "react";
import { REDUCER_ACTION, REDUCER_TYPE } from "../types/model";
const App = () => {
  const InitialState = {
    cities: "",
    isLoading: false,
  };

  function reducer(
    state: typeof InitialState,
    action: REDUCER_TYPE
  ): typeof InitialState {
    switch (action.type) {
      case REDUCER_ACTION.CITIES:
        return { ...state };

      default:
        throw new Error("This code is never to be reached.");
    }
  }
  const [{ cities, isLoading }, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    const controller = new AbortController();

    async function cityData() {
      try {
        const res = await fetch("http://localhost:9000/cities", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("The data couldn't be fetched");
        const data = await res.json();
        console.log(data);
        dispatch({ type: REDUCER_ACTION.CITIES, payload: data });
      } catch (error) {
        if ((error as Error).message === "AbortController") {
          console.log((error as Error).message);
        }
      }
    }

    cityData;

    return () => controller.abort();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route
              path="country"
              element={<p>This is the list of country</p>}
            />
            <Route path="form" element={<p>This is the form</p>} />
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
