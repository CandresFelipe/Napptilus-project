import { Route, Routes } from 'react-router-dom';

import { DetailsPage } from './detailPage';
import { HomePage } from './homePage';
import { NavigationBar } from './navigationBar';

import { DataProvider } from '../context/dataContext.jsx';
import { ItemInCartProvider } from '../context/itemsInCartContext.jsx';

export default function AppLayout() {
  return (
    <div>
      <DataProvider>
        <ItemInCartProvider>
          <NavigationBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/details/:id' element={<DetailsPage />} />
          </Routes>
        </ItemInCartProvider>
      </DataProvider>
    </div>
  );
}
