import { DELETE_SCHEDULE, POST_SCHEDULE, READ_SCHEDULE, UPDATE_SCHEDULE } from "../actionTypes";

const initialState = {
    schedules: [],
    // state lainnya
};

const scheduleReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case POST_SCHEDULE:
            return {
                ...state,
                schedules: [...state.schedules, action.payload]
            };
            case READ_SCHEDULE:
            return {
                ...state,
                schedules: payload
            };
            case UPDATE_SCHEDULE : 
            const updatedSchedule = state.Teacher.map(schedule => 
                schedule.id === payload.id ? { ...schedule, ...payload } : schedule
              );
              return {
                ...state,
                schedules: updatedSchedule,
              };
              case DELETE_SCHEDULE : 
              const remainingSchedule = state.schedules.filter(schedule => schedule.id !== payload.id);
              return {
                ...state,
                schedules : remainingSchedule
              }
        default:
            return state;
    }
};

export default scheduleReducer;
