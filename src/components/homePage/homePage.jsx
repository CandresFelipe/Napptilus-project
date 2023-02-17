import { Typography } from '@mui/material';
import React, { useEffect } from 'react';

import { ListView } from './listView.jsx';
import { SearchBar } from './searchBar.jsx';

import useGetAllItems from '../../api/useGetAllItems';
import { Spinner } from '../../common/Elements/Spinner';
import { useDataContext } from '../../context/dataContext.jsx';
import { AxiosErrorHandler } from '../../utils/errors/axiosErrorHandler.jsx';

export function HomePage() {
  const {
    data: itemsData,
    isSuccess,
    isError,
    error,
    isLoading
  } = useGetAllItems();
  const [filteredData, setFilteredData] = useDataContext();

  useEffect(() => {
    if (itemsData) {
      setFilteredData(itemsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsData]);

  return isError ? (
    <AxiosErrorHandler error={error} />
  ) : isLoading ? (
    <Spinner />
  ) : isSuccess ? (
    <div style={{ marginTop: 100 }}>
      <Typography variant='h1' color='black' alt='title-home-page'>
        CompraTuMovil.com
      </Typography>
      <SearchBar />
      <ListView filteredData={filteredData} />
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
