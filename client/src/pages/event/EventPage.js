import React, { useState, useEffect } from "react";
import { EventClient } from "../../grpc/event/event_grpc_web_pb"; // Клиент gRPC
import { 
  ListEventsRequest, 
  NewEventRequest, 
  EventInfo 
} from "../../grpc/event/event_pb"; // Сгенерированные сообщения
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CreateEventForm from "./CreateEventForm.js"; 
import UsersList from "./UsersList.js"; 
import EventsList from "./EventsList.js"; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import AddIcon from '@mui/icons-material/Add';

// Стили основной страницы
const StyledPage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "800px",
  margin: "0 auto",
  padding: theme.spacing(4),
}));

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));



const EventPage = () => {
  const client = new EventClient("http://localhost:8001"); // URL gRPC-сервера
  const theme = useTheme();

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState(false);
  const [openUsers, setOpenUsers] = React.useState(true);
  const [openUsersList, setOpenUsersList] = useState(false);

  const ButtonList = () => {
    return (
    <List>
      <ListItem  disablePadding sx={{ display: 'block' }}>
        <ListItemButton>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText primary={'user info'}/>
        </ListItemButton>
      </ListItem>
      <ListItem  disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => setOpenUsersList(true)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={'users list'}/>
        </ListItemButton>
      </ListItem>
      <ListItem  disablePadding sx={{ display: 'block' }}>
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={'create event'}/>
        </ListItemButton>
      </ListItem>
    </List>
  
    )
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const navigate = useNavigate(); // Хук для управления навигацией

  const token = localStorage.getItem("jwt_token");
  const metadata = {
    authorization: token,
  };

  const fetchEvents = async () => {
    const request = new ListEventsRequest();
    client.listEvents(request, metadata, (err, response) => {
      if (err) {
        console.error("Ошибка загрузки списка магазинов:", err.message);
        return;
      }
      setEvents(response.getInfoList().map((event) => event.toObject()));
    });
  };

  return (
    <div>
      <StyledPage>
        <MuiAppBar position="fixed" open={openUsers}>
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              Stavki Na Demisa
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={()=> setOpenUsers(true)}
              sx={[openUsers && { display: 'none' }]}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </MuiAppBar>

          <DrawerHeader />
          <Typography variant="h6" gutterBottom>
            События
          </Typography>
          <Divider sx={{ marginY: 3 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={() =>setNewEvent(true)}
              sx={{ alignSelf: "flex-start" }}
            >
              Создать событие
            </Button>
            <CreateEventForm open={newEvent} onClose={() => {setNewEvent(false);fetchEvents();}} />
          <Divider sx={{ marginY: 3 }} />
          <EventsList events={events} setEvents={(e) => setEvents(e)}/>
          <UsersList open={openUsersList} onClose={() => setOpenUsersList(false)}/>

        <Drawer
          sx={{
            flexShrink: 0,
          }}
          variant="persistent"
          anchor="right"
          open={openUsers}
        >
          <Box sx={{height: '10vh', width: '100%'}}>
          <DrawerHeader>
            <IconButton onClick={() => setOpenUsers(false)}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider/>
          </Box>
          <ButtonList/>
          
        </Drawer>
          
      </StyledPage>
      <Typography variant="body2" color="textSecondary">
          (c) Brigada, Inc
      </Typography>

    </div>

  );
};

export default EventPage;
