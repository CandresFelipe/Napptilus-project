import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from './homePage';
import { NavigationBar } from './navigationBar';

import { DataProvider } from '../context/dataContext.jsx';
import theme from '../utils/styles/theme';

export default function AppLayout() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <NavigationBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </DataProvider>
      </ThemeProvider>
    </div>
  );
}
