import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
    height: 160,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    height: 160,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
});
