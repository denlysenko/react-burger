import { combineReducers } from 'redux';

import authReducer from './auth';
import builderReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers({
  builder: builderReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer;
