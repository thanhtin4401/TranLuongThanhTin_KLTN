import { combineReducers } from 'redux';

import listHotelReducer from './hotelSlice';

const roomReducer = combineReducers({
  listHotel: listHotelReducer,
});
export default roomReducer;
