import React from "react";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Button,
  Card,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutClearList } from "../actions/todoActions";
import jwt_decode from "jwt-decode";
import surgeTodoHor from "../images/surgeTodoHor.png";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

function Navbar() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { leftTodo, completed } = useSelector(
    (state) => state.todoCountReducer
  );

  var token = localStorage.getItem("tokenTasksTodoJwt");
  var decoded = jwt_decode(token);

  // signout popover functions
  //
  //
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //
  //
  // end signout popover functions

  const userLogout = () => {
    //logout procedure
    localStorage.removeItem("tokenTasksTodoJwt");
    dispatch(userLogoutClearList());

    //redirect to login
    navigate("/");
  };

  // jsx part
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          width: "100vw",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: {
              xs: 2,
              lg: 10,
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
              <Box
                component="img"
                sx={{
                  height: { xs: 30, md: 50 },
                  mt: 1,
                }}
                alt="The house from the offer."
                src={surgeTodoHor}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },
              }}
            >
              {""}
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  height: 50,
                  width: "100%",
                }}
              >
                <Typography variant="h6" color="textPrimary" sx={{ ml: 1 }}>
                  Tasks To Do : {leftTodo}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  height: 50,
                  width: "100%",
                  pr: 6,
                }}
              >
                <Typography variant="h6" color="textPrimary" sx={{ ml: 1 }}>
                  Tasks Completed : {completed}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="textPrimary" sx={{ ml: 1 }}>
                  Hello, {decoded.name}
                </Typography>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  color="secondary"
                >
                  <Avatar
                    sx={{
                      height: 40,
                      width: 40,
                      bgcolor: "#2196F3",
                    }}
                  >
                    {decoded.name.substring(0, 2)}
                  </Avatar>
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Card
                    sx={{
                      boxShadow: "0px 10px 35px -1px rgba(0, 0, 0, 0.07)",
                      px: 5,
                      py: 2,
                    }}
                  >
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={userLogout}
                    >
                      Logout
                    </Button>
                  </Card>
                </Popover>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
}

export default Navbar;
