import type { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

/** Query slice state interface */
export interface QueryState {
  /** String containing current search query */
  query: string;

  /** Array of objects representing DataGrid sort settings */
  sortModel: GridSortModel;

  /** Object used to map page number to end cursor */
  pageToCursorMap: Record<number, string>;

  /** Object defining pagination settings used in DataGrid component */
  paginationModel: GridPaginationModel;

  /** Currently selected node id */
  selectedNodeId: string | null;
}

const initialState: QueryState = {
  query: '',
  sortModel: [],
  pageToCursorMap: {},
  paginationModel: {
    page: 0,
    pageSize: 10,
  },
  selectedNodeId: null,
};

/** Store slice responsible for query state */
export const querySlice = createSlice({
  name: 'querySlice',
  initialState,
  reducers: {
    /** Set current query */
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.pageToCursorMap = {};
      state.paginationModel.page = 0;
      state.selectedNodeId = null;
    },

    /** Set sort model */
    setSortModel(state, action: PayloadAction<GridSortModel>) {
      state.sortModel = action.payload;
    },

    /** Set pagination model */
    setPaginationModel(state, action: PayloadAction<GridPaginationModel>) {
      let page = action.payload.page;

      if (state.paginationModel.pageSize !== action.payload.pageSize) {
        page = 0;
        state.pageToCursorMap = {};
      }

      state.paginationModel.page = page;
      state.paginationModel.pageSize = action.payload.pageSize;
    },

    /** Set cursor representing next page */
    setCurrentCursor(state, action: PayloadAction<string>) {
      state.pageToCursorMap[state.paginationModel.page + 1] = action.payload;
    },

    /** Set currently selected node id */
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
  },
});

export const { setQuery, setSortModel, setPaginationModel, setCurrentCursor, setSelectedNodeId } = querySlice.actions;
