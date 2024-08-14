import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '@/state/store';
import { CenteredContent } from './CenteredContent';
import { RepositoryInfo } from './RepositoryInfo';

/** Component that displays app side bar and it's content */
export function AppSideBar() {
  const selectedNodeId = useAppSelector(state => state.querySlice.selectedNodeId);

  return (
    <Stack p={3} pr={4} bgcolor="#F2F2F2" width={480}>
      {selectedNodeId
        ? <RepositoryInfo id={selectedNodeId} />
        : (
            <CenteredContent>
              <Typography variant="body2">Выберите репозиторий</Typography>
            </CenteredContent>
          )}
    </Stack>
  );
}
