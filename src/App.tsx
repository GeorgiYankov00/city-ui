import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSortModel,
  GridToolbar,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import {
  API_URL,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  HIGH_POPULATION,
} from "./utils/const";
import { Box } from "@mui/material";
import {
  getQueryFilterParams,
  getQueryPaginationParams,
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
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [rowCount, setRowCount] = useState(0);

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
      getQueryFilterParams(filterModel) +
      getQueryPaginationParams(paginationModel);

    axios
      .get(queryUrl)
      .then((response) => {
        setRows(response.data);
        setIsLoading(false);
        setRowCount(Number(response.headers?.["x-total-count"]) || 0);
      })
      .catch((err) => {
        toast.error(
          "An error occurred while fetching the cities. " +
            err?.response?.data?.error
        );
      });
  }, [sortModel, filterModel, paginationModel]);

  useEffect(() => {
    fetchData();
  }, [fetchData, triggerFetch]);

  return (
    <Box>
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
        rowCount={rowCount}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
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
