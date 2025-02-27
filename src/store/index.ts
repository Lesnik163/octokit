import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reposReducer from './slices/reposSlice';

const rootReducer = combineReducers({
	repos: reposReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];