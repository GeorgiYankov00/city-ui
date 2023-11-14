import { useState } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import { API_URL } from "../utils/const";
import { CityCreate } from "../utils/types/City.type";
import { toast } from "react-toastify";
import axios from "axios";
const CityForm = () => {
  const handleCreateCity = (newCityData: CityCreate) => {
    axios
      .post(API_URL, newCityData)
      .then(() => {
        //reload
        setName("");
        setArea("");
        setPopulation("");

        toast.success("City created successfully!");
      })
      .catch((err) => {
        toast.error(
          "An error occurred while creating the city. " +
            err?.response?.data?.error
        );
      });
  };

  const [name, setName] = useState("");
  const [area, setArea] = useState<number | "">("");
  const [population, setPopulation] = useState<number | "">("");
  const isDisabled = !name || !area || !population;

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const cityData = {
      name,
      area: Number(area),
      population: Number(population),
    };

    handleCreateCity(cityData);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
              onChange={(e) => {
                const value = Number(e.target.value);
                setArea(isNaN(value) ? "" : value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Population"
              variant="outlined"
              type="number"
              value={population}
              required
              onChange={(e) => {
                const value = Number(e.target.value);
                setPopulation(isNaN(value) ? "" : value);
              }}
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
    </Box>
  );
};

export default CityForm;
