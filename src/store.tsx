import React, { createContext, useContext, useState } from 'react';
import storage from './localStorage';

interface Data {
  currentSeasonId: string;
  activeScoringSessionId: string;
  readyForStartup: boolean;
}

interface StoreContextInterface extends Data {
  setActiveScoringSessionId: (id: string) => void;
  setData: (data: Data) => void;
}

const initialData = {
  currentSeasonId: null,
  activeScoringSessionId: null,
  readyForStartup: false,
};

const StoreContext = createContext<StoreContextInterface>({
  ...initialData,
  setData: data => null,
  setActiveScoringSessionId: data => null,
});

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Data>();

  const setActiveScoringSessionId = async (id: string) => {
    await storage.set('activeScoringSessionId', id);
    setData({ ...data, activeScoringSessionId: id });
  };

  React.useEffect(() => {
    const loadInitialData = async () => {
      // await storage.clearStorage();
      const storedData = await storage.getMultiple([
        'activeScoringSessionId',
        'currentSeasonId',
      ]);

      setData({
        ...data,
        ...storedData,
        readyForStartup: true,
      });
    };

    loadInitialData();
  }, []);

  const contextState = {
    ...data,
    setActiveScoringSessionId,
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
