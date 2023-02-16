import { createContext, useContext, useEffect, useState } from 'react';
const ItemInCartContext = createContext(undefined);

export function useItemInCartContext() {
  const context = useContext(ItemInCartContext);
  if (context === undefined) {
    throw new Error('use useItemsInCartContext within a ItemInCartProvider');
  }
  return context;
}

function getInitialState() {
  const value = localStorage.getItem('cartItems');
  return value ? JSON.parse(value) : 0;
}

export function ItemInCartProvider({ children }) {
  const [items, setItems] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  return (
    <ItemInCartContext.Provider value={[items, setItems]}>
      {children}
    </ItemInCartContext.Provider>
  );
}
