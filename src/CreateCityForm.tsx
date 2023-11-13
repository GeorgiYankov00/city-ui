import { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { CityFormProps } from "./utils/CityCreate.type";

const CityForm: React.FC<CityFormProps> = ({ onCreateCity }) => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const isDisabled = !name || !area || !population;

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const cityData = {
      name,
      area: Number(area),
      population: Number(population),
    };

    onCreateCity(cityData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <TextField
            label="Name"
            variant="outlined"
            type="string"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Area"
            type="number"
            variant="outlined"
            value={area}
            required
            onChange={(e) => setArea(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Population"
            variant="outlined"
            type="number"
            value={population}
            required
            onChange={(e) => setPopulation(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isDisabled}
          >
            Create City
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CityForm;
