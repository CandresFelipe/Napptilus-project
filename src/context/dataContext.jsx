import { createContext, useContext, useState } from 'react';
const DataContext = createContext(undefined);

export function useDataContext() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('use useDataContext within a DataProvider');
    }
    return context;
}

export function DataProvider({ children }) {
    const [filteredData, setFilteredData] = useState([]);
    return (
        <DataContext.Provider value={[filteredData, setFilteredData]}>
            {children}
        </DataContext.Provider>
    );
}
