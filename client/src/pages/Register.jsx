import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
import todoLogo from "../images/todoLogo.png";

function Register() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(20).required("First name is required"),
      lastName: Yup.string().max(30).required("Last name is required"),
      password: Yup.string().max(20).required("Password is required"),
      retypePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords are not the same!")
        .required("Password confirmation is required!"),
    }),
    onSubmit: async (values) => {
      const response = await axiosInstance.post(
        "/register",
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
      if (data.status === "ok") {
        navigate("/");
      } else {
        alert(`Login Failed :  ${data.error}`);
      }
    },
  });

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
            <Box sx={{ my: 2, textAlign: "center" }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
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
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={Boolean(
                    formik.touched.retypePassword &&
                      formik.errors.retypePassword
                  )}
                  fullWidth
                  helperText={
                    formik.touched.retypePassword &&
                    formik.errors.retypePassword
                  }
                  label="Retype Password"
                  margin="normal"
                  name="retypePassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.retypePassword}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography color="textSecondary" variant="body1">
                Have an account?{" "}
                <Link
                  to="/"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default Register;
