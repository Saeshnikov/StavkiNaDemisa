import React, { useState, useEffect } from "react";
import { EventClient } from "../../grpc/event/event_grpc_web_pb"; // Клиент gRPC
import {
  ListEventsRequest, 
  NewEventRequest, 
  EventInfo 
} from "../../grpc/event/event_pb"; // Сгенерированные сообщения
import { UserClient } from "../../grpc/user/user_grpc_web_pb"; // Клиент gRPC
import {
  GetUserRequest, 
} from "../../grpc/user/user_pb"; // Сгенерированные сообщения
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
  const userClient = new UserClient("http://localhost:8002");
  const theme = useTheme();
  const [userInfo, setUserInfo] = useState([]);

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);
  const [openUsersList, setOpenUsersList] = useState(false);

  const ButtonList = () => {
    return (
    <List>
      <Divider sx={{borderColor:"white"}} variant={'middle'}/>
      <ListItem  disablePadding sx={{ display: 'block',backgroundColor:'black' }}>
        <ListItemButton >
          <ListItemIcon >
            <BadgeIcon htmlColor="#FFFFFF" />
          </ListItemIcon>
          <ListItemText primary={'user info'}/>
        </ListItemButton>
      </ListItem>
      <Divider sx={{borderColor:"white"}} variant={'middle'}/>
      <ListItem  disablePadding sx={{ display: 'block',backgroundColor:'black' }}>
        <ListItemButton onClick={() => setOpenUsersList(true)}>
          <ListItemIcon color={'white'}>
            <PeopleIcon  htmlColor="#FFFFFF" />
          </ListItemIcon >
          <ListItemText primary={'users list'}/>
        </ListItemButton>
      </ListItem>
      <Divider sx={{borderColor:"white"}} variant={'middle'}/>
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
    const getUserRequest = new GetUserRequest();
      userClient.getUser(request, metadata, (err, response) => {
        if (err) {
          console.error("Ошибка загрузки списка пользователей:", err.message);
          return;
        }
        setUserInfo(response.getInfo().toObject());
      });
  };

  return (
    <div >
      <StyledPage>

                    <CreateEventForm open={newEvent} onClose={() => {setNewEvent(false);fetchEvents();}}/>
        <MuiAppBar position="fixed" open={openUsers} sx={{backgroundColor:'black'}}>
          <Toolbar >
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          <img 
              src="/Logo_white.png" 
              alt="Описание изображения"
              style={{ 
                width: 80,
                height: 80,
                
              }}
              noWrap sx={{ flexGrow: 1 }}
            />
            </Typography>
            {userInfo.name}
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
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              textAlign: 'center',
              width: '100%',
              marginTop: '20px',
            }}
          >
            События
          </Typography>
          <Divider 
            sx={{ 
              marginY: 3,
              borderBottomWidth: 2, // Увеличение толщины линии
              width: '60%',        // Уменьшение длины до 40% от ширины контейнера
              mx: 'auto',           // Автоматические отступы по бокам для центрирования
              color: 'rgba(1, 1, 1, 1)' 
            }} 
            variant="middle"
          />
          <EventsList events={events} setEvents={(e) => setEvents(e)} onClick={() => setNewEvent(true)} fetch={fetchEvents}/>
          <UsersList open={openUsersList} onClose={() => setOpenUsersList(false)}/>

        <Drawer
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              backgroundColor: '#000000', // Чёрный фон
              color: '#ffffff', // Белый текст
              borderRight: '1px solid rgba(255,255,255,0.12)' // Граница
            }
          }}
          variant="persistent"
          anchor="right"
          open={openUsers}
        >
          <Box sx={{height: '10vh', width: '100%', backgroundColor:'black', color:'white'}}>
          <DrawerHeader>
            <IconButton onClick={() => setOpenUsers(false)} color={'inherit'}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <ButtonList/>
          </Box>
          
          
        </Drawer>
          
      </StyledPage>
      <Typography variant="body2" color="black">
          (c) Brigada, Inc
      </Typography>

    </div>

  );
};

export default EventPage;
