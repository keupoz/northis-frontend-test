import { CircularProgress } from '@mui/material';
import { CenteredContent } from './CenteredContent';

/** A simple component that shows centered loading animation */
export function Loader() {
  return (
    <CenteredContent>
      <CircularProgress />
    </CenteredContent>
  );
}
