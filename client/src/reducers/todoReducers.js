export default (todos = [], action) => {
  switch (action.type) {
    case "FETCH_TODOS":
      return action.payload;
    case "CREATE_TODO":
      return [action.payload, ...todos];
    case "UPDATE":
      return todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    case "DELETE_TODO":
      return todos.filter((todo) => todo._id !== action.payload);
    case "LOGOUT":
      return [];
    default:
      return todos;
  }
};
