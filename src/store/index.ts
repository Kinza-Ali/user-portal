import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

const reducer = combineReducers({
  root:  rootReducer,
});
const appReducer = (state: TObject, action: TObject) => {

  return reducer(state, action);
};

export const store = configureStore({
  reducer: appReducer,
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default () => {
  return { store };
};
