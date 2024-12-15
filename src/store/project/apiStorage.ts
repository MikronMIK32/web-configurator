import { Storage } from 'redux-persist';

const apiStorage: Storage = {
  getItem(key) {
    console.log('getting', key, 'from cached API storage');
    // TODO: get key from API. Develop Caching strategy to read once
    return '';
  },
  removeItem(key) {
    console.log('removing', key, 'from cached API storage');
    // TODO: remove key from API
  },
  setItem(key, value) {
    console.log('saving', key, '=', value, 'to API');
    // TODO: save value to API
  },
};

export default apiStorage;
