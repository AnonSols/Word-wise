export const enum REDUCER_ACTION {
  CITIES,
  LOADING,
  CURRENT_CITY,
  ADD_CITY,
  REMOVE_CITY,
  ENDPOINT = "http://localhost:3000/",
}

export const sample = {
  cityName: "Lisbon",
  country: "Portugal",
  emoji: "🇵🇹",
  date: "2027-10-31T15:59:59.138Z",
  notes: "My favorite city so far!",
  position: {
    lat: 38.727881642324164,
    lng: -9.140900099907554,
  },
  id: "73930385",
};

export interface CountryProp {
  country: string;
  emoji: string;
}
export type cities = typeof sample;

export type InitialState = {
  cities?: Array<typeof sample>;
  isLoading?: boolean;
  currentCity: typeof sample;
};
export interface positionProp {
  lat: number;
  lng: number;
}
export type AddCityProp = {
  cityName: string;
  date: string;
  
  notes: string;
  position: positionProp;
};
export interface REDUCER_TYPE {
  type: REDUCER_ACTION;
  payload?: {
    loading?: boolean;
    data?: (typeof sample)[];
    currentCity?: typeof sample;
    addCity?: AddCityProp;
  };
}
