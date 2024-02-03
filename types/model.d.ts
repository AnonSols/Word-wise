export enum REDUCER_ACTION {
  CITIES,
  ISLOADING,
}

export interface REDUCER_TYPE {
  type: REDUCER_ACTION;
  payload?: object;
}
