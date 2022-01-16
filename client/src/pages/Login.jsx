import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Google as GoogleIcon } from "../icons/google";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import todoLogo from "../images/todoLogo.png";
import { axiosInstance } from "../config";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await axiosInstance.post(
        "/login",
        {
          values: values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response;
      if (data.user) {
        localStorage.setItem("tokenTasksTodoJwt", data.user);
        navigate("/home");
      } else {
        alert(`Login Failed :  ${data.error}`);
      }
    },
  });

  const responseGoogle = async (response) => {
    if (response.error) {
      console.log(response.error);
      alert(`Login Failed :  ${response.error}`);
    } else {
      const userEmail = response.profileObj.email;

      const res = await axiosInstance.post(
        "/google/login",
        {
          userEmail: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = res;
      if (data.user) {
        localStorage.setItem("tokenTasksTodoJwt", data.user);
        navigate("/home");
      } else {
        alert(`Login Failed :  ${data.error}`);
      }
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box
              component="img"
              sx={{
                height: { xs: 70, md: 100 },
                mt: 1,
                m: "auto",
                display: "flex",
              }}
              alt="The house from the offer."
              src={todoLogo}
            />
            <Box sx={{ my: 3, textAlign: "center" }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Box
              sx={{
                pb: 2,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or Sign In with
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <GoogleLogin
                  clientId="1021576830644-8n0dbvr3vne4jue0vptjvdcn8t8hvvik.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      fullWidth
                      color="error"
                      startIcon={<GoogleIcon />}
                      size="large"
                      variant="contained"
                    >
                      Google
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography color="textSecondary" variant="body1" sx={{ pt: 5 }}>
                Don&apos;t have an account? <Link to="/register">Sign Up</Link>
              </Typography>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default Login;
