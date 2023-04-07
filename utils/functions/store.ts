import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
import cartReducer from './slice/cart';
import zoneReducer from './slice/zone';

import storage from 'redux-persist/lib/storage';

const persistConfigCart = {
	key: 'cart',
	version: 1,
	storage
};

// const persistConfigZone = {
// 	key: 'zone',
// 	version: 1,
// 	storage
// };

// @dev Set the persisted reducer
const persistCartReducer = persistReducer(persistConfigCart, cartReducer);
// const persistZoneReducer = persistReducer(persistConfigZone, zoneReducer);

// @dev Combine the reducers
const rootReducer = combineReducers({
	persitedCartReducer: persistCartReducer
});

// @dev Create the store
export function makeStore() {
	return configureStore({
		reducer: {
			rootReducer,
			zone: zoneReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE]
				}
			})
	});
}

// @dev create the store
const store = makeStore();

// @dev export the persistor
export const persistor = persistStore(store);

// @dev export the app state type
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

// @dev export the store
export default store;
