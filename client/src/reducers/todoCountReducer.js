const initialState = {
  leftTodo: 0,
  completed: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEFT_TO_DO":
      return {
        ...state,
        leftTodo: action.payload,
      };
    case "GET_COMPLETED":
      return {
        ...state,
        completed: action.payload,
      };
    default:
      return 0;
  }
};
