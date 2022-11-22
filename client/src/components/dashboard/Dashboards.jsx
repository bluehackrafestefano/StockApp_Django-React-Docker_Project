import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { StockContext } from "../../context/StockContext";
import ListItemsComp from "./ListItemsComp";
import { AuthContext } from "../../context/AuthContext";
// import IconButton from "@mui/material/IconButton";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "darkslategrey",
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const { logOut, currentUser } = React.useContext(AuthContext);
  const { getAllTransaction, getFirms, getProducts,getBrands } = React.useContext(StockContext);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getAllTransaction();
    getFirms();
    getProducts();
    getBrands();
    if (window.innerWidth <= 768) {
      setOpen(false); //küçük ekranda linkler kapansın diye
    }
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }} className="dashboard">
        <CssBaseline />
        <AppBar position="absolute" sx={{ backgroundColor: "darkslategrey" }}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              justifyContent: "space-between",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              // sx={{ flexGrow: 1 }}
            >
              Clarusway Stock App
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              onClick={handleMenu}
              sx={{ cursor: "pointer" }}
              noWrap
            >
              {/* <AccountCircle sx={{fontSize:55}}/> */}
              <Avatar>{currentUser[0].toUpperCase()}</Avatar>
              {/* {currentUser && currentUser[0].toUpperCase()}{currentUser.slice(1)} */}
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ flexGrow: 1,bgcolor:"white",color:"black",fontSize:40,width:"55px",height:"55px",marginLeft:"2px",'&:hover': {
                  backgroundColor: 'black',
                  color:"white",
                  opacity: [0.9, 0.8, 0.7],
                } }}
              >
                <AccountCircle sx={{fontSize:55,width:"8vh",height:"8vh",color: "darkslategray"}}/>
              </IconButton> */}
            </Typography>
            {currentUser && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                // anchorOrigin={{
                //   vertical: 'top',
                //   horizontal: 'right',
                // }}
                keepMounted
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'right',
                // }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => logOut(navigate)}>Logout</MenuItem>
              </Menu>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar></Toolbar>
          <ListItemsComp />
          {/* {Yandaki linklerin olduğu component} */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#B7BF99"
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
