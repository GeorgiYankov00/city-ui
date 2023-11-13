export type CityCreate = {
  name: string;
  area: number;
  population: number;
};

export type CityFormProps = {
  onCreateCity: (newCityData: CityCreate) => void;
};
