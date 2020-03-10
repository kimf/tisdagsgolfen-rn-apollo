import React, { createContext, useContext, useState } from 'react';
import storage from './localStorage';

export type ContextKey = 'currentSeasonId';
export type ContextData = string;

interface Data {
  currentSeasonId: string;
  readyForStartup: boolean;
}

interface StoreContextInterface extends Data {
  setData: (data: Data) => void;
}

const initialData = {
  currentSeasonId: null,
  readyForStartup: false,
};

const StoreContext = createContext<StoreContextInterface>({
  ...initialData,
  setData: data => null,
});

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Data>();

  React.useEffect(() => {
    const fetchCurrentSeason = async () => {
      // await storage.clearStorage();
      const csId = await storage.get('currentSeasonId');
      if (csId !== null) {
        setData({ currentSeasonId: csId, readyForStartup: true });
      } else {
        setData({ readyForStartup: true, currentSeasonId: null });
      }
    };

    fetchCurrentSeason();
  }, []);

  const contextState = {
    ...data,
    setData,
  };

  return (
    <StoreContext.Provider value={contextState}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export { StoreProvider, useStore, StoreContext };
