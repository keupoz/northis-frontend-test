import { Typography } from '@mui/material';
import { CenteredContent } from './CenteredContent';

/** A component showing a welcome message */
export function Welcome() {
  return (
    <CenteredContent>
      <Typography variant="h3" color="#4F4F4F">Добро пожаловать</Typography>
    </CenteredContent>
  );
}
