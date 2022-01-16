import { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  updateTodo,
  getTodosForCount,
} from "../actions/todoActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//alert for form validation
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//CreateToDo component
// prop -> selectedTodo is the selected todo id when clicking the edit button in todo component
// prop -> setSelectedTodo is a function to change the selectedTodo id
// both are responsible for editing a todo in the same text field in the UI
function CreateToDo({ selectedTodo, setSelectedTodo }) {
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState("");

  //check is selectedTodo and if yes -> set the selected todo as the current todo to edit it
  const todo = useSelector((state) =>
    selectedTodo
      ? state.todoReducers.find((todo) => todo._id === selectedTodo)
      : null
  );

  //change the textfield value to editable todo text
  useEffect(() => {
    if (todo) {
      setTodoText(todo.todoText);
    }
  }, [todo]);

  //decide the action createTodo or UpdateTodo
  const handleSubmit = async (e) => {
    if (todoText.length > 0) {
      e.preventDefault();
      if (todo) {
        dispatch(updateTodo(selectedTodo, todoText));
      } else {
        dispatch(createTodo(todoText));
      }
      clearForm();
      dispatch(getTodosForCount());
    } else {
      //if input lower than 1 -> open snackbar
      handleClick();
    }
  };

  //clear form data and change selected todo using prop function
  const clearForm = () => {
    setSelectedTodo(null);
    setTodoText("");
  };

  // snack bar form validation popup functions start
  //
  //
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //
  //
  // snack bar form validation popup functions end

  return (
    <Box
      sx={{
        mx: "auto",
        width: {
          xs: "90%",
          md: "50%",
        },
        mt: 15,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Enter some text to the textbox
        </Alert>
      </Snackbar>
      <form autoComplete="off">
        <Card
          sx={{
            boxShadow: "0px 10px 35px -1px rgba(0, 0, 0, 0.07)",
          }}
        >
          <Typography variant="h5" color="textPrimary" sx={{ m: 2 }}>
            Add a Todo
          </Typography>
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Todo Text"
                  name="todoText"
                  value={todoText}
                  onChange={(event) => {
                    setTodoText(event.target.value);
                  }}
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 2,
              pt: 0,
            }}
          >
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              {!selectedTodo ? "Create Todo" : "Update Todo"}
            </Button>
          </Box>
        </Card>
      </form>
    </Box>
  );
}

export default CreateToDo;
