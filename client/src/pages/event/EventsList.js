import React, { useState, useEffect } from "react";
import { EventClient } from "../../grpc/event/event_grpc_web_pb"; // Клиент gRPC
import { 
  ListEventsRequest, 
} from "../../grpc/event/event_pb"; // Сгенерированные сообщения
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import BetForm from "./MakeABetForm";

// Стили для карточек магазинов
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

const EventsList = (props) => {
  const client = new EventClient("http://localhost:8001"); // URL gRPC-сервера

  const { events, setEvents, onClick, fetch } = props;

  const [betFormOpen, setBetFormOpen] = useState(false);
  const [betEventId, setBetEventId] = useState(0);

  const navigate = useNavigate(); // Хук для управления навигацией

  const token = localStorage.getItem("jwt_token");
  const metadata = {
    authorization: token,
  };

  return (
    <div>
      <BetForm open={betFormOpen} onClose={() => {setBetFormOpen(false); fetch();}} eventId={betEventId}/>
          <Grid container spacing={2} sx={{color:'black'}}>
            <Grid item xs={12} sm={6} md={4} >
            <StyledCard sx={{ 
                    height: '100%',
                    p: 0, // Убираем внутренние отступы карточки
                    backgroundColor: 'white' // Белый фон карточки
                }}>
                    <Button
                    variant="contained"
                    onClick={() => onClick()}
                    sx={{ 
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white', // Белый фон
                        color: 'black',
                        borderRadius: 0, // Убираем скругление углов
                        boxShadow: 'none', // Убираем тень
                        '&:hover': {
                        backgroundColor: '#f5f5f5', // Светло-серый при наведении
                        boxShadow: 'none' // Убираем тень при наведении
                        },
                        '&:active': {
                        backgroundColor: '#000000' // Серый при нажатии
                        },
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                    <AddIcon sx={{ fontSize: 70, color: 'rgba(1, 1, 1, 0.8)' }} />
                    </Button>
                </StyledCard>
                </Grid>
           
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.eventId}>
                  <StyledCard onClick={() => {
                      if (!event.closed){
                        setBetEventId(event.eventId);
                        setBetFormOpen(true);
                      }
                    }}>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                      <Grid item xs={0}>
                        <Typography variant="subtitle1" align="left">
                          {event.coefY.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={0}>
                        <Typography variant="subtitle1" align="center">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={0}>
                        <Typography variant="subtitle1" align="right">
                        {event.coefN.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider>
                    <Chip
                        label={event.closed ? "Closed" : "Open"}
                        variant="outlined"
                        sx={{
                            marginBottom: 1,
                            borderColor: event.closed ? '#000000' : '#000000',
                            color: event.closed ? '#000000' : '#000000',

                        }}
                        />
                    </Divider>
                    <Grid container spacing={2}>
                      <Grid item xs={7} sm={3}>
                        <Typography variant="subtitle1" gutterBottom>
                          {event.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </StyledCard>
                  
              </Grid>
              
            ))}
          </Grid>
    </div>

  );
};

export default EventsList;
