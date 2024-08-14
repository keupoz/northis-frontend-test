import { DataGrid, type GridColDef, type GridPaginationModel, type GridRowSelectionModel, type GridSortModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import type { SearchRepositoriesItemFragment, SearchRepositoriesQuery } from '@/api/generated/githubApi';
import { setPaginationModel, setSelectedNodeId, setSortModel } from '@/state/querySlice';
import { useAppDispatch, useAppSelector } from '@/state/store';
import classes from './SearchResult.module.scss';

// Field names correspond to fields which the sort query keyword accepts
const columns: GridColDef<SearchRepositoriesItemFragment>[] = [
  { flex: 1, field: 'name', headerName: 'Название' },
  { flex: 1, field: 'language', headerName: 'Язык', valueGetter: (_value, row) => row.primaryLanguage?.name },
  { flex: 1, field: 'forks', headerName: 'Число форков', valueGetter: (_value, row) => row.forkCount },
  { flex: 1, field: 'stars', headerName: 'Число звёзд', valueGetter: (_value, row) => row.stargazerCount },
  // Sort keyword `updated` looks at pushed and created dates, so we use them, too
  { flex: 1, field: 'updated', headerName: 'Дата обновления', type: 'date', valueGetter: (_value, row) => new Date(row.pushedAt ?? row.createdAt) },
];

/** Search result component props */
export interface SearchResultProps {
  /** GraphQL search query result */
  data: SearchRepositoriesQuery;

  /** Flag to show loader */
  isLoading: boolean;
}

/** Shows search result table */
export function SearchResult({ data, isLoading }: SearchResultProps) {
  const sortModel = useAppSelector(state => state.querySlice.sortModel);
  const paginationModel = useAppSelector(state => state.querySlice.paginationModel);
  const selectedNodeId = useAppSelector(state => state.querySlice.selectedNodeId);

  const dispatch = useAppDispatch();

  const rows = useMemo(() => {
    return data.search.nodes?.filter(node => node?.__typename === 'Repository');
  }, [data.search.nodes]);

  function handleSortModelChange(model: GridSortModel) {
    dispatch(setSortModel(model));
  }

  function handlePaginationModelChange(model: GridPaginationModel) {
    dispatch(setPaginationModel(model));
  }

  function handleRowSelectionModelChange(model: GridRowSelectionModel) {
    const [row] = model;

    if (typeof row === 'string') {
      dispatch(setSelectedNodeId(row));
    }
  }

  return (
    <DataGrid
      className={classes.SearchResult_DataGrid}

      loading={isLoading}

      rows={rows}
      columns={columns}
      rowCount={data.search.repositoryCount}
      pageSizeOptions={[5, 10, 15]}

      disableColumnFilter

      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}

      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}

      rowSelectionModel={selectedNodeId ? [selectedNodeId] : []}
      onRowSelectionModelChange={handleRowSelectionModelChange}
    />
  );
}
