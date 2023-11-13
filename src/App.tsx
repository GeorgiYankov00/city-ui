import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSortModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { API_URL, HIGH_POPULATION } from "./utils/const";
import { Box } from "@mui/material";
import { maxHeight } from "@mui/system";

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

  const fetchData = useCallback(() => {
    setIsLoading(true);

    let queryUrl = API_URL;

    //to do extract into
    if (sortModel.length > 0) {
      const sortField = sortModel[0].field;
      const sortOrder = sortModel[0].sort === "asc" ? "" : "-";
      const sortParam = `${sortOrder}${sortField}`;
      queryUrl += `?sort=${sortParam}`;
    }

    fetch(queryUrl)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setIsLoading(false);
      });
  }, [sortModel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ height: 500, width: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        loading={isLoading}
      />
    </Box>
  );
}
