import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { type SearchRepositoriesItemFragment, useSearchRepositoriesQuery } from '@/api/generated/githubApi';
import { useQueryOptions } from '@/hooks/useSearchQueryOptions';
import { setCurrentCursor } from '@/state/querySlice';
import { useAppDispatch } from '@/state/store';
import { AppSideBar } from './AppSideBar';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import { SearchResult } from './SearchResult';

/** App content component props */
export interface AppContentProps {
/** String representing if data is currently being loaded */
  isLoading: boolean;

  /** Search result nodes from the RTK Query hook data result */
  data: SearchRepositoriesItemFragment[] | null;

  /** String representing an error if it exists */
  error: string | null;
}

/** Main app content component */
export function AppContent() {
  const dispatch = useAppDispatch();

  const queryOptions = useQueryOptions();
  const { data, isLoading, isFetching, isError } = useSearchRepositoriesQuery(queryOptions);

  useEffect(() => {
    if (data?.search.pageInfo.endCursor) {
      dispatch(setCurrentCursor(data?.search.pageInfo.endCursor));
    }
  }, [data?.search.pageInfo.endCursor, dispatch]);

  // First load
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (data) {
    return (
      <Stack direction="row" flexGrow={1}>
        <Stack pt={3} pr={2} pl={4} gap={3} flexGrow={1}>
          <Typography variant="h3" color="rgba(0,0,0,0.87)">Результаты поиска</Typography>

          <SearchResult data={data} isLoading={isFetching} />
        </Stack>

        <AppSideBar />
      </Stack>
    );
  }

  return null;
}
