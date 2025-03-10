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
import { styled } from "@mui/material/styles";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

// Стили основной страницы
const StyledPage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "800px",
  margin: "0 auto",
  padding: theme.spacing(4),
}));

// Стили для формы добавления филиалов
const StyledForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const CreateEventForm = (props) => {
  const client = new EventClient("http://localhost:8001"); // URL gRPC-сервера

  const { onClose, open } = props;
  const [newEvent, setNewEvent] = useState({ name: "", description: "", judge: 0 });

  const navigate = useNavigate(); // Хук для управления навигацией

  const token = localStorage.getItem("jwt_token");
  const metadata = {
    authorization: token,
  };

  const handleAddEvent = async () => {
    const request = new NewEventRequest();
    request.setName(newEvent.name);
    request.setDescription(newEvent.description);
    request.setJudge(newEvent.judge);

    client.newEvent(request, metadata, (err, response) => {
      if (err) {
        console.error("Ошибка добавления магазина:", err.message);
        alert("Ошибка добавления магазина:", err.message)
        return;
      }
      setNewEvent({ name: "", description: "", judge: 0 });
      onClose();
    });
  };

  return (
    <Dialog onClose={onClose} fullWidth aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Создать событие</DialogTitle>
      <StyledForm>
        <TextField
          label="Название"
          fullWidth
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <TextField
          label="Описание"
          fullWidth
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          multiline
          rows={3}
        />
        <TextField
          label="Судья"
          fullWidth
          value={newEvent.judge}
          onChange={(e) => setNewEvent({ ...newEvent, judge: e.target.value })}
        />
        <TextField
          label="Не участвуют"
          fullWidth
          value={newEvent.excludedUsers}
          onChange={(e) => setNewEvent({ ...newEvent, excluded: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddEvent}
          sx={{ alignSelf: "flex-start" }}
        >
          Создать событие
        </Button>
      </StyledForm>
    </Dialog>

  );
};

export default CreateEventForm;
