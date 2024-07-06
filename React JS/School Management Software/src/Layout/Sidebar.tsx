import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomList from "../Components/CustomList";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import schoolLogo from '../Images/school-logo.png'
import Footer from "./Footer";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

interface DrawerProps {
  open: boolean;
  theme: Theme;
}

const Drawer = styled("nav", {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: drawerWidth,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    backgroundColor: "var(--darkBlue)",
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "var(--darkBlue)",
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    backgroundColor: "var(--darkBlue)",
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "var(--darkBlue)",
      display: 'flex',
      flexDirection: 'column',
    },
  }),
}));

export default function Sidebar(props: any) {
  const { pageName, breadcrumbLink, breadcrumbNestedLink, element } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<string | null>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" className="bg-darkBlue" style={{ zIndex: 9999 }} open={open}> {/* You can increase the zIndex if you want to the loader to not overlap the header */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="w-100" variant="h6" noWrap component="div">
            <h1 className="m-0 fs-2">
              {pageName}
            </h1>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer style={{ zIndex: 9998 }} open={open} theme={theme}> {/* You can increase the zIndex if you want to the loader to not overlap the sidebar */}
        <DrawerHeader>
          <IconButton className="text-white" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List className="pb-5">
          <div className="mx-auto mb-2" style={{maxWidth: "180px"}}>
            <img src={schoolLogo} className='img-fluid' alt="" />
          </div>
          <CustomList onTabClick={handleTabClick} activeTab={activeTab} />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
        <DrawerHeader />
        <ul className="text-orange d-flex align-items-center list-unstyled gap-1">
          <li>
            <Link className="text-black text-hover-orange" to="/">
              Home
            </Link>
          </li>
          <NavigateNextIcon />
          <li>{breadcrumbLink}</li>
          {breadcrumbNestedLink && (
            <>
              <NavigateNextIcon />
              <li>{breadcrumbNestedLink}</li>
            </>
          )}
        </ul>
        {element}
        <Footer />
      </Box>
    </Box>
  );
}
