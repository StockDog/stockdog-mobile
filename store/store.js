import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

import reducers from '../reducers/index';

const config = {
  key: 'root',
  storage: ExpoFileSystemStorage,
};

const reducer = persistReducer(config, reducers);

const store = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export default () => ({ persistor, store });
