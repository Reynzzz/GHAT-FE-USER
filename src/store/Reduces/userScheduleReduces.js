// categoryProducts.js

import { READ_SCHEDULE_BY_USER} from "../actionTypes";

const initialState = {
  userSchedules: [],
};

const userScheduleReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_SCHEDULE_BY_USER:
      return {
        ...state,
        userSchedules: payload,
      };
    default:
      return state;
  }
};

export default userScheduleReduces;
