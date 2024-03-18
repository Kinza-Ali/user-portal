import { combineReducers } from 'redux';
import { featuresReducer } from './features';

const rootReducer = combineReducers({
  features: featuresReducer,
});

export default rootReducer;
