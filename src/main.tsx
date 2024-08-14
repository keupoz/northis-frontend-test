import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blue, cyan } from '@mui/material/colors';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { store } from './state/store';
import './index.scss';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: cyan[800],
    },
    secondary: {
      main: blue[500],
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />

    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
