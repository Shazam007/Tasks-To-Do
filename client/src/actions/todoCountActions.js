export const countLeftTodo = (fetchedData) => async (dispatch) => {
  try {
    //get all posts set to count todos left to do//
    const countedLeftTodos = fetchedData.filter(
      (todo) => todo.status === "todo"
    );
    let leftTodoCount = 0;
    leftTodoCount = countedLeftTodos.length;

    //update the store using todoCountReducer
    dispatch({
      type: "GET_LEFT_TO_DO",
      payload: leftTodoCount,
    });

    //get all posts set to count completed todos//
    const countedCompletedTodos = fetchedData.filter(
      (todo) => todo.status === "done"
    );
    let CompletedTodoCount = 0;
    CompletedTodoCount = countedCompletedTodos.length;

    //update the store using todoCountReducer
    dispatch({
      type: "GET_COMPLETED",
      payload: CompletedTodoCount,
    });
  } catch (error) {
    console.log(error);
  }
};
