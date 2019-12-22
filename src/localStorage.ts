import LegacyStorage from '@react-native-community/async-storage-backend-legacy';
import AsyncStorageFactory from '@react-native-community/async-storage';

type StorageType = {
  currentSeasonId: string;
};

const legacyStorage = new LegacyStorage();

const storage = AsyncStorageFactory.create<StorageType>(legacyStorage, {
  errorHandler: console.error,
  logger: console.log,
});

// ready to use
export default storage;
