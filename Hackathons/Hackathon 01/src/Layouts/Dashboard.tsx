import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import SRButton from '../Components/SRButton';
import { signoutUser } from '../Config/FirebaseMethods';
import { toastGreen, toastRed } from '../Components/My Toasts';
import { delUser } from '../Config/Redux/Slices/UserSlice';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sample from '../Pages/Sample';
import Admin from '../Pages/Admin';
import Footer from './Footer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate()
    const userData = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        signoutUser().then(() => {
            toastGreen("Successfully logged out.")
            dispatch(delUser())
        }).catch(() => { toastRed("Failed to logout.") })
    }

    const listArr: any = [
        {
            value: "Admin",
            icon: <MailIcon />,
            link: "admin",
        },
        {
            value: "Classes",
            icon: <InboxIcon />,
            link: "classes",
        },
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className='bg-gradientBlue'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className='h-100 w-100 d-flex justify-content-between align-items-center'>
                        <h1 className='fs-4'>Title name</h1>
                        <div className='d-flex align-items-center gap-2'>
                            <h2 className='fs-4'>{userData.Username}</h2>
                            <SRButton btnValue="Logout" onClick={handleLogout} className="fs-6 rounded-pill px-2" />
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "var(--darkBlue)",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            // classes={{ paper: 'bg-darkBlue' }} 
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {listArr.map((text: any, index: any) => (
                        <ListItem key={index} disablePadding onClick={() => navigate(text.link)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.value} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            <Routes>
                <Route path="admin" element={<Admin />} />
                <Route path="classes" element={<Sample />} />
            </Routes>
                <Footer />
            </Main>

        </Box>
    );
}
