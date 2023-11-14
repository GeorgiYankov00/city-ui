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
import CityForm from "./components/CreateCityForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function App() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: [],
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "City", flex: 1 },
    { field: "area", headerName: "Area", flex: 1 },
    {
      field: "population",
      headerName: "Population",
      flex: 1,
      renderCell: (params) => {
        if (params.value > HIGH_POPULATION) {
          return <strong>{params.value}</strong>;
        }
        return params.value;
      },
    },
    { field: "density", headerName: "Density", flex: 1 },
  ];

  const fetchData = useCallback(() => {
    setIsLoading(true);

    const queryUrl =
      API_URL +
      getQuerySortParams(sortModel) +
      getQueryFilterParams(filterModel);

    axios
      .get(queryUrl)
      .then((response) => {
        setRows(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(
          "An error occurred while fetching the cities. " +
            err?.response?.data?.error
        );
      });
  }, [sortModel, filterModel]);

  useEffect(() => {
    fetchData();
  }, [fetchData, triggerFetch]);

  return (
    <Box sx={{ height: 500, width: 1 }}>
      <ToastContainer />
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
        <CityForm
          triggerFetch={() => {
            setTriggerFetch(!triggerFetch);
          }}
        />
      </Box>
    </Box>
  );
}
