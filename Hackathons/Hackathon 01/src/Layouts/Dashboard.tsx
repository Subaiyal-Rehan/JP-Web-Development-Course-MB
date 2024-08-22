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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import SRButton from '../Components/SRButton';
import { signoutUser } from '../Config/FirebaseMethods';
import { toastGreen, toastRed } from '../Components/My Toasts';
import { delUser } from '../Config/Redux/Slices/UserSlice';
import { NavLink, Route, Routes } from 'react-router-dom';
import Admin from '../Pages/Admin';
import Footer from './Footer';
import CreateRoom from '../Pages/Rooms/CreateRoom';
import AllRooms from '../Pages/Rooms/AllRooms';
import Booking from '../Pages/Bookings/Booking';
import AllBookings from '../Pages/Bookings/AllBookings';
import AllStaff from '../Pages/Staff/AllStaff';
import AddStaff from '../Pages/Staff/AddStaff';
import RoomDetails from '../Pages/Rooms/RoomDetails';
import StaffDetails from '../Pages/Staff/StaffDetails';
import Signup from '../Pages/Signup';
import AllReservations from '../Pages/AllReservations';

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
            id: "1",
            value: "Admin Dashboard",
            icon: <MailIcon />,
            link: "",
        },
        {
            id: "2",
            value: "Rooms",
            icon: <InboxIcon />,
            children: [
                {
                    value: "All Rooms",
                    link: "rooms/allrooms"
                },
                {
                    value: "Add a Room",
                    link: "rooms/addroom"
                },
            ],
        },
        {
            id: "3",
            value: "Bookings",
            icon: <InboxIcon />,
            children: [
                {
                    value: "All Bookings",
                    link: "bookings/allbooking"
                },
                {
                    value: "Book a Room",
                    link: "bookings/booking"
                },
            ],
        },
        {
            id: "4",
            value: "Staff",
            icon: <InboxIcon />,
            children: [
                {
                    value: "All Staff",
                    link: "staff/allstaff"
                },
                {
                    value: "Add Staff",
                    link: "staff/addstaff"
                },
            ],
        },
        {
            id: "5",
            value: "All Enquiries",
            icon: <InboxIcon />,
            link: "enquiries/allenquiries",
        },
        {
            id: "6",
            value: "All Reservations",
            icon: <InboxIcon />,
            link: "allreservations"
        },
        {
            id: "7",
            value: "Signup",
            icon: <InboxIcon />,
            link: "signup",
        },
        {
            id: "8",
            value: "Home",
            icon: <MailIcon />,
            link: "/",
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
                        <h1 className='fs-4'>HotelVista</h1>
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
                    {listArr.map((text: any) => (
                        <SimpleTreeView key={text.id}>
                            {text.children ? (
                                <TreeItem className="text-white" itemId={text.id} label={text.value}>
                                    {text.children.map((item: any, indexIn: any) => (
                                        <NavLink
                                            key={`${text.id}-${indexIn}`}
                                            to={item.link}
                                            className={({ isActive }) =>
                                                isActive ? "text-decoration-none text-white customActive" : "text-decoration-none text-white"
                                            }
                                        >
                                            <TreeItem
                                                itemId={`${text.id}-${indexIn}`}
                                                className=" py-1 bg-darkBluee"
                                                label={item.value}
                                            />
                                        </NavLink>
                                    ))}
                                </TreeItem>
                            ) : (
                                <NavLink
                                    key={text.id}
                                    to={text.link}
                                    className={({ isActive }) =>
                                        isActive ? "text-decoration-none text-white customActive" : "text-decoration-none text-white"
                                    }
                                >
                                    <TreeItem itemId={`${text.id}`} className="py-1" label={text.value} />
                                </NavLink>
                            )}
                        </SimpleTreeView>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Routes>
                    <Route path="/" element={<Admin />} />
                    <Route path="rooms/addroom" element={<CreateRoom />} />
                    <Route path="rooms/allrooms" element={<AllRooms />} />
                    <Route path="rooms/:id" element={<RoomDetails />} />
                    <Route path="bookings/booking" element={<Booking />} />
                    <Route path="bookings/allbooking" element={<AllBookings />} />
                    <Route path="staff/allstaff" element={<AllStaff />} />
                    <Route path="staff/addstaff" element={<AddStaff />} />
                    <Route path="allreservations" element={<AllReservations />} />
                    <Route path="staff/:id" element={<StaffDetails />} />
                    <Route path="signup" element={<Signup />} />
                </Routes>
                <div className="background dashboard-background z-n1">
                    <div className="ashape dashboard-shape"></div>
                    <div className="shape dashboard-shape"></div>
                </div>
                <Footer />
            </Main>

        </Box>
    );
}
