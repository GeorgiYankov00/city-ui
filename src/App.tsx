import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { API_URL, HIGH_POPULATION } from "./utils/const";

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

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="App" style={{ minHeight: 200 }}>
      <DataGrid rows={rows} columns={columns} loading={isLoading} />
    </div>
  );
}
