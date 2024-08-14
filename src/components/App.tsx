import { Box, Stack } from '@mui/material';
import { useAppSelector } from '@/state/store';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { Welcome } from './Welcome';

/** App entry component */
export function App() {
  const query = useAppSelector(state => state.querySlice.query);

  return (
    <Stack minHeight="100svh">
      <AppHeader />

      <Stack flexGrow={1}>
        {query ? <AppContent /> : <Welcome />}
      </Stack>

      <Box px={4} py={2} bgcolor="#4F4F4F" />
    </Stack>
  );
}
