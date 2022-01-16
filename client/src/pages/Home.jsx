import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreateToDo from "../components/CreateToDo";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../actions/todoActions";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

function Home() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  //monitor state for todo edit
  const [selectedTodo, setSelectedTodo] = useState(null);

  //monitor state of deleting action to reRender list
  const [isDeleted, setIsDeleted] = useState(1);

  //monitor state of token validation to render Homepage
  const [isLoading, setIsLoading] = useState(true);

  //to verify valid user at the loading
  useEffect(() => {
    setIsLoading(true);

    const token = localStorage.getItem("tokenTasksTodoJwt");
    if (token) {
      const user = jwt_decode(token);

      if (!user) {
        //invalid token
        localStorage.removeItem("tokenTasksTodoJwt");
        alert(`Token Invalid : redirecting to Login page`);
        navigate("/");
      } else {
        //user is valid
        dispatch(getTodos());
      }
    } else {
      alert(`No Token Found : redirecting to Login page`);
      navigate("/");
    }
    setIsLoading(false);
  }, [selectedTodo, isDeleted, navigate, dispatch]);

  //components of homepage
  return isLoading ? (
    <div></div>
  ) : (
    <div>
      <Navbar />
      <CreateToDo
        setSelectedTodo={setSelectedTodo}
        selectedTodo={selectedTodo}
      />
      <TodoList setSelectedTodo={setSelectedTodo} setIsDeleted={setIsDeleted} />
    </div>
  );
}

export default Home;
