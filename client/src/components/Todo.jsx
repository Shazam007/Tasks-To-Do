import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Delete as DeleteIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodoStatus } from "../actions/todoActions";

function Todo({ todo, setSelectedTodo, setIsDeleted }) {
  const dispatch = useDispatch();

  //get todo from todolist
  const { todoText, status, _id } = todo;

  //set intial todo state
  const [todoStatus, setTodoStatus] = React.useState(status);

  //Todo color change function
  let backColor;
  if (status === "todo") {
    backColor = "linear-gradient(45deg, #ffecee, #febdce)";
  } else if (status === "inprogress") {
    backColor = "linear-gradient(45deg, #ccdbfd, #edf2fb)";
  } else {
    backColor = "linear-gradient(45deg, #cbe5df, #95e3c3)";
  }

  //todo status handler
  const handleStateChange = (event) => {
    const state = event.target.value;
    setTodoStatus(state);
    dispatch(updateTodoStatus(_id, state));
    setIsDeleted(_id + state);
  };

  //todo delete handler
  const handleDelete = async () => {
    dispatch(deleteTodo(_id));
    setIsDeleted(_id);
  };

  //todo edit handler
  const handleEdit = () => {
    //todo editing part
    setSelectedTodo(_id);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "0px 17px 38px -1px rgba(0, 0, 0, 0.02)",
          background: backColor,
        }}
      >
        <CardContent>
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
            sx={{ textDecoration: status === "done" ? "line-through" : "none" }}
          >
            {todoText}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2, backgroundColor: "white" }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={todoStatus}
                    label="Todo Status"
                    onChange={handleStateChange}
                  >
                    <MenuItem value={"todo"}>To Do</MenuItem>
                    <MenuItem value={"inprogress"}>In Progress</MenuItem>
                    <MenuItem value={"done"}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
}

export default Todo;
