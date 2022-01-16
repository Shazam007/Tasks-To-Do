import { countLeftTodo } from "./todoCountActions";
import { axiosInstance } from "../config";

// 1) create a todo
export const createTodo = (todoText) => async (dispatch) => {
  try {
    const createTodo = await axiosInstance.post(
      "/todo",
      {
        todoText: todoText,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("tokenTasksTodoJwt"),
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = createTodo.data;

    if (createTodo.data.status === "ok") {
      // todoReducer dispacth
      dispatch({
        type: "CREATE_TODO",
        payload: data,
      });
    } else {
      alert(`No access : ${createTodo.data.error}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// 2) fetch todos
export const getTodos = () => async (dispatch) => {
  try {
    const todoList = await axiosInstance.get("/todos", {
      headers: {
        "x-access-token": localStorage.getItem("tokenTasksTodoJwt"),
      },
    });
    const fetchedData = todoList.data.todoList;

    if (todoList.data.status === "ok") {
      // todoReducer dispacth
      dispatch({
        type: "FETCH_TODOS",
        payload: fetchedData,
      });
      dispatch(countLeftTodo(fetchedData));
    } else {
      alert(`No access : ${todoList.data.error}`);
    }
  } catch (error) {
    alert(`No access : ${error}`);
  }
};

// 3) delete a todo
export const deleteTodo = (_id) => async (dispatch) => {
  try {
    const todoList = await axiosInstance.delete(`/todo/${_id}`, {
      headers: {
        "x-access-token": localStorage.getItem("tokenTasksTodoJwt"),
      },
    });

    const { deletedTodo } = todoList.data;

    if (todoList.data.status === "ok") {
      // todoReducer dispacth
      dispatch({
        type: "DELETE_TODO",
        payload: deletedTodo,
      });
    } else {
      alert(`No access : ${todoList.data.error}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// 4) update a todo => todo text
export const updateTodo = (_id, todoText) => async (dispatch) => {
  try {
    const updateTodo = await axiosInstance.post(
      `/todo/${_id}`,
      {
        todoText: todoText,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("tokenTasksTodoJwt"),
          "Content-Type": "application/json",
        },
      }
    );

    const { updatedTodo } = updateTodo.data;

    if (updateTodo.data.status === "ok") {
      // todoReducer dispacth
      dispatch({
        type: "UPDATE_TODO",
        payload: updatedTodo,
      });
    } else {
      alert(`No access : ${updateTodo.data.error}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// 5) update a todo => status
export const updateTodoStatus = (_id, todoStatus) => async (dispatch) => {
  try {
    const updateTodo = await axiosInstance.post(
      `/todo/status/${_id}`,
      {
        todoStatus: todoStatus,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("tokenTasksTodoJwt"),
          "Content-Type": "application/json",
        },
      }
    );

    const { updatedTodo } = updateTodo.data;

    if (updateTodo.data.status === "ok") {
      // todoReducer dispacth
      dispatch({
        type: "UPDATE_TODO",
        payload: updatedTodo,
      });
    } else {
      alert(`No access : ${updateTodo.data.error}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// 6) clear the store state when user logout
export const userLogoutClearList = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
    payload: [],
  });
};

// 7) fecth all todos for count
export const getTodosForCount = () => async (dispatch) => {
  try {
    const todoList = await axiosInstance.get("/todos", {
      headers: {
        "x-access-token": localStorage.getItem("tokenTasksTodoJwt"),
      },
    });
    const fetchedData = todoList.data.todoList;

    if (todoList.data.status === "ok") {
      // todoCountReducer dispacth
      dispatch(countLeftTodo(fetchedData));
    } else {
      alert(`No access : ${todoList.data.error}`);
    }
  } catch (error) {
    console.log(error);
  }
};
