import React from "react";
import Todo from "./Todo";
import { Grid, Box, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import { useSelector } from "react-redux";

function TodoList({ setSelectedTodo, setIsDeleted }) {
  const todos = useSelector((state) => state.todoReducers);

  // if there are todos in the state response --> todos.length > 0
  return !todos.length ? (
    <Box
      sx={{
        width: "80%",
        m: "auto",
        mt: 10,
        mb: 5,
      }}
    >
      <Typography
        align="center"
        color="textPrimary"
        variant="h6"
        sx={{ mb: 2, mx: "auto" }}
      >
        Todo List is Empty.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box
      sx={{
        width: "80%",
        m: "auto",
        mt: 5,
        mb: 5,
      }}
    >
      <Grid container spacing={3}>
        {todos.map((todo) => {
          return (
            <Todo
              todo={todo}
              key={todo._id}
              setSelectedTodo={setSelectedTodo}
              setIsDeleted={setIsDeleted}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default TodoList;
