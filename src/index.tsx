import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EnvsWrapper } from './common/envs/EnvsWrapper';
import Router from './router';
import './styles/global.css';
import { theme } from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <EnvsWrapper>
    <CssBaseline />
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { refetchOnMount: false, retry: false, refetchOnWindowFocus: false } },
        })
      }
    >
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </EnvsWrapper>,
);
