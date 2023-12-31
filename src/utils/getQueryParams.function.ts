import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";

export function getQuerySortParams(sortModel: GridSortModel): string {
  if (sortModel.length === 0) {
    return "";
  }
  const sortField = sortModel[0].field;
  const sortOrder = sortModel[0].sort === "asc" ? "" : "-";
  const sortParam = `${sortOrder}${sortField}`;
  return `sort=${sortParam}&`;
}

export function getQueryFilterParams(filterModel: GridFilterModel): string {
  const filterValues = filterModel.quickFilterValues || [];
  if (filterValues.length === 0) {
    return "";
  }
  return `city=${filterValues.join(" ")}&`;
}

export function getQueryPaginationParams(
  paginationModel: GridPaginationModel
): string {
  if (!paginationModel) {
    return "";
  }
  const page = paginationModel.page;
  const pageSize = paginationModel.pageSize;

  return `limit=${pageSize}&skip=${page * pageSize}&`;
}
