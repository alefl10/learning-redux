import { combineReducers } from 'redux';
import C from '../constants';

const goal = (state = 10, action) => {
  if (action.type === C.SET_GOAL) {
    return parseInt(action.payload, 10);
  }
  return state;
};

const skiDay = (state = [], action) => {
  if (action.type === C.ADD_DAY) {
    return action.payload;
  }
  return state;
};

const errors = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ERROR:
      return [...state, action.payload];

    case C.CLEAR_ERROR:
      return state.filter((message, i) => i !== action.payload);

    default:
      return state;
  }
};

const allSkiDays = (state = [], action) => {
  switch (action.type) {
    case C.ADD_DAY:
      const hasDay = state.some(skiday => skiday.date === action.payload.date);
      return (hasDay) ?
        state :
        [
          ...state,
          skiDay(null, action),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

    case C.REMOVE_DAY:
      return state.filter(skiday => skiday.date !== action.payload);

    default:
      return state;
  }
};


const fetching = (state = false, action) => {
  switch (action.type) {
    case C.FETCH_RESORT_NAMES:
      return true;

    case C.CANCEL_FETCHING:
      return false;

    case C.CHANGE_SUGGESTIONS:
      return false;

    default:
      return state;
  }
};

const suggestions = (state = [], action) => {
  switch (action.type) {
    case C.CLEAR_SUGGESTIONS:
      return [];

    case C.CHANGE_SUGGESTIONS:
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  allSkiDays,
  goal,
  errors,
  resortNames: combineReducers({
    fetching,
    suggestions,
  }),
});
