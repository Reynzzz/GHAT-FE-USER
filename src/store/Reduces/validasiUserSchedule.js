// categoryProducts.js

import { READ_SCHEDULE_NO_USER} from "../actionTypes";

const initialState = {
  validasiUsers: [],
};

const validasiUserSchedule = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_SCHEDULE_NO_USER:
      return {
        ...state,
        validasiUsers: payload,
      };
    default:
      return state;
  }
};

export default validasiUserSchedule;
