export type LocationType = {
  name: string;
  info: string;
};

export type CityType = {
  id: string;
  city: string;
  country: string;
  locations: LocationType[];
};

export type CountryType = {
  name: string;
  currency: string;
};
