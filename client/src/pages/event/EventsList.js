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
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Стили для карточек магазинов
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

const EventsList = (props) => {
  const client = new EventClient("http://localhost:8001"); // URL gRPC-сервера

  const { events, setEvents } = props;

  const navigate = useNavigate(); // Хук для управления навигацией

  const token = localStorage.getItem("jwt_token");
  const metadata = {
    authorization: token,
  };

  return (
    <div>
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.eventId}>
                  <StyledCard>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                      <Grid item xs={0}>
                        <Typography variant="subtitle1" align="left">
                          {event.coefY}
                        </Typography>
                      </Grid>
                      <Grid item xs={0}>
                        <Typography variant="subtitle1" align="center">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={0}>
                        <Typography variant="subtitle1" align="right">
                        {event.coefN}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider>
                      <Chip
                        label={
                          event.closed
                            ? "Closed"
                            : "Open"
                        }
                        color="primary"
                        variant="outlined"
                        sx={{ marginBottom: 1 }}
                      />
                    </Divider>
                    <Grid container spacing={2}>
                      <Grid item xs={7} sm={3}>
                        <Typography variant="subtitle1" gutterBottom>
                          {event.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    {event.closed &&
                      <Chip
                        label={
                          event.result
                            ? "Closed"
                            : "Open"
                        }
                        color="primary"
                        variant="outlined"
                        sx={{ marginBottom: 1 }}
                      />
                    }
                    <Typography variant="body2" color="textSecondary">
                      {event.description}
                    </Typography>
                  </StyledCard>
                  
              </Grid>
              
            ))}
          </Grid>
    </div>

  );
};

export default EventsList;
