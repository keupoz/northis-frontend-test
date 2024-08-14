import { Typography } from '@mui/material';
import { CenteredContent } from './CenteredContent';

/** Component to display an error */
export function ErrorMessage() {
  return (
    <CenteredContent>
      <Typography variant="h4" color="red">Произошла ошибка</Typography>
    </CenteredContent>
  );
}
