import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Close from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../../Store/api/PostApi";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a7fba",
    },
    secondary: {
      main: "#f44336",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: "16px",
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
  width: "90%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

const initialState = {
  title: "",
  description: "",
  isPrivate: false,
  image: null,
};

const validationSchema = Yup.object({
  title: Yup.string().min(1).required("Required"),
  description: Yup.string().min(1).required("Required"),
  image: Yup.mixed()
    .required("Required")
    .test(
      "fileType",
      `Unsupported File Format use "jpeg" , "png" , "gif" , "jpg"`,
      (value) => {
        return (
          value &&
          ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
            value.type
          )
        );
      }
    ),
});

export default function CreatePost() {
  const [createPost, { isSuccess }] = useCreatePostMutation();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("image", values.image);
        formData.append("isPrivate", values.isPrivate);
        createPost(formData);
      } catch (e) {
        toast.error("An error occurred while creating the post.");
      }
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Post Added Successfully");
      handleClose();
    }
  }, [isSuccess]);
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  return (
    <ThemeProvider theme={theme}>
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
            Add Post{" "}
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item style={{ marginBottom: "24px" }}>
                <CreateIcon />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item style={{ marginBottom: "24px" }}>
                <DescriptionIcon />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item style={{ marginBottom: "24px" }}>
                <InsertPhotoIcon />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="end" mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
