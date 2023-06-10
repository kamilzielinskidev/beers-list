import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EnvsWrapper } from './common/envs/EnvsWrapper';
import Router from './router';
import './styles/global.css';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <EnvsWrapper>
    <CssBaseline />
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retryOnMount: false, retry: false } } })}
    >
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </EnvsWrapper>,
);
