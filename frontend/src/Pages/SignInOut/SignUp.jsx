import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSignUpMutation } from "../../Store/api/signInApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const defaultTheme = createTheme();
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  firstname: Yup.string().min(2).max(30).required("Required"),
  lastname: Yup.string().min(2).max(30).required("Required"),
  username: Yup.string().min(6).max(30).required("Required"),
  password: Yup.string().min(8).max(15).required("Required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
  // ),
});
const inputProbs = {
  style: {
    color: "white",
    borderColor: "white",
  },
};
const InputLabelProps = {
  style: { color: "white" },
};
const sxx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

export default function SignUp() {
  const [signupMutation, { isSuccess, isLoading, error }] = useSignUpMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      isPrivate: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      signupMutation(values);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successfull");
      navigate("/");
    }
    if (error) {
      toast.error("Something went wrong!!!");
      navigate("/sign-up");
    }
  }, [navigate, isSuccess, error]);

  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
              inputProps={inputProbs}
              InputLabelProps={InputLabelProps}
              sx={sxx}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              inputProps={inputProbs}
              InputLabelProps={InputLabelProps}
              sx={sxx}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              inputProps={inputProbs}
              InputLabelProps={InputLabelProps}
              sx={sxx}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              inputProps={inputProbs}
              InputLabelProps={InputLabelProps}
              sx={sxx}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              inputProps={inputProbs}
              InputLabelProps={InputLabelProps}
              sx={sxx}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                {"Already have an account?"}
                <Link href="/" variant="body2" sx={{ color: "white" }}>
                  {" Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
