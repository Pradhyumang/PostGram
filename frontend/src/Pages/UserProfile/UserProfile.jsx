import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Modal,
  Box,
  Typography,
  Avatar,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Close from "@mui/icons-material/Close";
import {
  useProfileInfoQuery,
  useProfileUpdateMutation,
} from "../../Store/api/profileApi";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: "#52b202",
    },
    secondary: {
      main: "#b22a00",
    },
    primary2: {
      main: "#1a7fba",
    },
    secondary2: {
      main: "#f44336",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};
const initialState = {
  firstname: "",
  lastname: "",
  username: "",
  isPrivate: true,
};

const validationSchema = Yup.object({
  firstname: Yup.string().min(2).max(30).required("Required"),
  lastname: Yup.string().min(2).max(30).required("Required"),
  username: Yup.string().min(6).max(30).required("Required"),
});
export default function ProfileModal() {
  const [open, setOpen] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  // const [profile, { isSuccess }] = useProfileInfoQuery();
  const { data, isLoading, isSuccess, refetch } = useProfileInfoQuery();

  const [
    updateProfile,
    {
      isLoading: profileIsLoading,
      isSuccess: profileIsSuccess,
      isError: profileIsError,
      error: profileErrorMessage,
    },
  ] = useProfileUpdateMutation();
  // const [profileData] = useState({});
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await updateProfile(values);
      handleClose();
    },
  });
  useEffect(() => {
    if (isSuccess && data) {
      formik.setValues({
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        username: data.data.username,
        isPrivate: true,
      });
    }
    if (profileIsSuccess) {
      toast.success("Update successfull");
      refetch();
    } else if (profileIsError && profileErrorMessage) {
      toast.error(profileErrorMessage.data.message || "Something Went Wrong");
    }
  }, [
    isSuccess,
    data,
    profileIsError,
    profileIsSuccess,
    refetch,
    profileErrorMessage,
  ]);
  if (isLoading || profileIsLoading) {
    return <>Loading</>;
  }
  // const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false), navigate("/home"));
  const handleEdit = () => {
    setOpenEdit(true);
  };
  // const handleClose = () => (
  //   setOpen(false), setFormData(initialState), navigate("/home")
  // );

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await updateProfile(formData);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Something went's wrong");
  //   }
  //   handleClose();
  // };
  const profileView = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            // src={profileData.profilePicture}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography id="profile-modal-title" variant="h6" component="h2">
            {data?.data?.firstname + " " + data?.data?.lastname}
          </Typography>
          <Typography
            id="profile-modal-description"
            variant="body1"
            color="textSecondary"
          >
            {data?.data?.username}
          </Typography>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              sx={{ mt: 2 }}
            >
              <EditIcon sx={{ color: "white" }} />
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              sx={{ mt: 2 }}
            >
              Close
            </Button>{" "}
          </div>
        </Box>
      </Box>
    </Modal>
  );
  const profileEdit = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Edit Profile
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            alignItems="flex-end"
            paddingBottom={"10px"}
          >
            <Grid item xs>
              <TextField
                fullWidth
                id="firstname"
                name="firstname"
                label="firstname "
                variant="outlined"
                // value={formData.firstname}
                // onChange={handleChange}
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="flex-end"
            paddingBottom={"10px"}
          >
            <Grid item xs>
              <TextField
                fullWidth
                id="lastname"
                name="lastname"
                label="lastname "
                variant="outlined"
                // value={formData.lastname}
                // onChange={handleChange}
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="username "
                variant="outlined"
                // value={formData.username}
                // onChange={handleChange}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ color: "white" }}
            >
              Update
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="outlined" color="secondary2" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
  const modals = openEdit ? profileEdit : profileView;
  return <ThemeProvider theme={theme}>{modals}</ThemeProvider>;
}
