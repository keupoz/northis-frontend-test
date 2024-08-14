import { useMemo } from 'react';
import type { SearchRepositoriesQueryVariables } from '@/api/generated/githubApi';
import { useAppSelector } from '@/state/store';

/** Hook used to build search query variables */
export function useQueryOptions() {
  const {
    query: rawQuery,
    sortModel,
    paginationModel: { page, pageSize },
    pageToCursorMap: { [page]: cursor },
  } = useAppSelector(state => state.querySlice);

  const sortFields = useMemo(() => {
    return sortModel.map(({ field, sort }) => `sort:${field}-${sort}`);
  }, [sortModel]);

  const query = useMemo(() => {
    return [rawQuery, ...sortFields].join(' ');
  }, [rawQuery, sortFields]);

  const queryOptions = useMemo(() => {
    const options: SearchRepositoriesQueryVariables = {
      query,
      pageSize,
      cursor,
    };

    return options;
  }, [cursor, pageSize, query]);

  return queryOptions;
}
