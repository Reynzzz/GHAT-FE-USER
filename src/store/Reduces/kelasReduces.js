import { POST_SCHEDULE, READ_KELAS, READ_SCHEDULE } from "../actionTypes";

const initialState = {
    Kelases: [],
    // state lainnya
};

const kelasReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
            case READ_KELAS:
            return {
                ...state,
                Kelases: payload
            };
        // case lain
        default:
            return state;
    }
};

export default kelasReducer;
