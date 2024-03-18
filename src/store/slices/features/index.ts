import { combineReducers } from 'redux';
import { userFeatureReducer } from './user';


const featuresReducer = combineReducers({
  user: userFeatureReducer,
});

export { featuresReducer };

export * from './user';
