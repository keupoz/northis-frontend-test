import type { PropsWithChildren } from 'react';
import { Stack } from '@mui/material';

/** Stack component that grows in flex space and centers it's content */
export function CenteredContent({ children }: PropsWithChildren) {
  return (
    <Stack alignItems="center" justifyContent="center" flexGrow={1}>
      {children}
    </Stack>
  );
}
