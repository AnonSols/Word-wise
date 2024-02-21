export enum REDUCER_ACTION {
  CITIES,
  LOADING,
  CURRENT_CITY,
  REMOVE_CITY,
  ENDPOINT = "http://localhost:9000/",
  DATA_ENDPOINT = "https://api.bigdatacloud.net/data/reverse-geocode-client",
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

export type AddCityProp = {
  newCity: {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: {
      lat: number;
      lng: number;
    };
  };
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
export interface REDUCER_TYPE {
  type: REDUCER_ACTION;
  payload?: {
    loading?: boolean;
    data?: (typeof sample)[];
    id?: string;
    currentCity?: typeof sample;
    addCity?: AddCityProp;
  };
}
