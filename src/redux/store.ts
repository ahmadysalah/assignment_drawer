import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { ReactElement } from 'react';
import { drawerReducer } from './reducers';

const reducers = combineReducers({
  drawer: drawerReducer,
});

const middleware = [thunk];

export const store = createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector = (): ReactElement[] | any =>
  useSelector((state: IDrawerState) => state.drawer);
