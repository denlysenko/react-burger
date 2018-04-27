import { combineReducers } from 'redux';

import builderReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers({
  builder: builderReducer,
  order: orderReducer
});

export default rootReducer;
