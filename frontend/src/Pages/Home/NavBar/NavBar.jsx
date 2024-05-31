import React, { useEffect } from "react";
import { Tabs, Tab, Menu, MenuItem } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import { removeCookie } from "../../../Cookie/cookie";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
// Custom theme to enhance the navbar
const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a7fba",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        },
        indicator: {
          backgroundColor: "#ffab00",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-selected": {
            color: "#ffab00",
          },
        },
      },
    },
  },
});

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;
      case "/post":
        setValue(1);
        break;
      case "/profile":
        setValue(2);
        break;
      default:
        setValue(false); // Reset value if no match is found
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/post");
        break;
      case 2:
        // setAnchorEl(anchorRef.current);
        // setOpen(true);
        setAnchorEl(event.currentTarget);
        setOpen((prevOpen) => !prevOpen);
        break;
      default:
        break;
    }
  };
  const handleProfile = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const logout = () => {
    removeCookie("accessToken");
    handleClose();
    navigate("/");
  };

  const profile = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <ThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
          variant="fullWidth"
          centered
        >
          <Tab
            icon={<HomeIcon />}
            aria-label="home"
            label="Home"
            iconPosition="start"
          />
          <Tab
            icon={<AddAPhotoIcon />}
            aria-label="add post"
            label="Add Post"
            iconPosition="start"
          />
          <Tab
            icon={<PersonPinIcon />}
            aria-label="profile"
            label="Profile"
            iconPosition="start"
            ref={anchorRef}
            onClick={handleProfile}
          />
        </Tabs>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onKeyDown={handleListKeyDown}
          slotProps={{
            paper: {
              style: {
                width: anchorRef.current
                  ? anchorRef.current.clientWidth - 10
                  : undefined,
              },
            },
          }}
        >
          <MenuItem onClick={profile}>Profile</MenuItem>
          {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </ThemeProvider>
    </>
  );
}
