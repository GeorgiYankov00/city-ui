import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSortModel,
  GridToolbar,
  GridFilterModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { API_URL, HIGH_POPULATION } from "./utils/const";
import { Box } from "@mui/material";
import {
  getQueryFilterParams,
  getQuerySortParams,
} from "./utils/getQueryParams.function";
import CityForm from "./CreateCityForm";
import { CityCreate } from "./utils/CityCreate.type";

const columns: GridColDef[] = [
  { field: "name", headerName: "City", flex: 1 },
  { field: "area", headerName: "Area", flex: 1 },
  {
    field: "population",
    headerName: "Population",
    flex: 1,
    renderCell: (params) => {
      if (params.value >= HIGH_POPULATION) {
        return <strong>{params.value}</strong>;
      }
      return params.value;
    },
  },
  { field: "density", headerName: "Density", flex: 1 },
];

export default function App() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });

  const fetchData = useCallback(() => {
    setIsLoading(true);

    const queryUrl =
      API_URL +
      getQuerySortParams(sortModel) +
      getQueryFilterParams(filterModel);

    fetch(queryUrl)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setIsLoading(false);
      });
  }, [sortModel, filterModel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateCity = (newCityData: CityCreate) => {
    console.log("New city data:", JSON.stringify(newCityData));

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCityData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box sx={{ height: 500, width: 1 }}>
      <DataGrid
        sx={{ m: 2 }}
        rows={rows}
        columns={columns}
        loading={isLoading}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        slots={{ toolbar: GridToolbar }}
        disableColumnFilter
        disableRowSelectionOnClick
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        filterMode="server"
        onFilterModelChange={(model) => setFilterModel(model)}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CityForm onCreateCity={handleCreateCity} />
      </Box>
    </Box>
  );
}
