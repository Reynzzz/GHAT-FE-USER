import { ADD_TEACHER, DELETE_TEACHER, READ_TEACHER, UPDATE_TEACHER } from '../actionTypes'; // Adjust the path as needed

const initialState = {
  Teacher: [],
};

const teacherReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case READ_TEACHER:
      return {
        ...state,
        Teacher: payload,
      };

    case ADD_TEACHER:
      return {
        ...state,
        Teacher: [...state.Teacher, payload],
      };

    case DELETE_TEACHER:
      const remainingTeachers = state.Teacher.filter(teacher => teacher.id !== payload.id);
      return {
        ...state,
        Teacher: remainingTeachers,
      };

    case UPDATE_TEACHER:
      const updatedTeachers = state.Teacher.map(teacher => 
        teacher.id === payload.id ? { ...teacher, ...payload } : teacher
      );
      return {
        ...state,
        Teacher: updatedTeachers,
      };

    default:
      return state;
  }
};

export default teacherReducer;
