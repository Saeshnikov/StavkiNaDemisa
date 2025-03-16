import React, { useState, useEffect } from "react";
import { EventClient, EventResult } from "../../grpc/event/event_grpc_web_pb"; // Клиент gRPC
import { 
  BetRequest
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

const BetForm = (props) => {
  const client = new EventClient("http://localhost:8001"); // URL gRPC-сервера

  const { onClose, open, eventId } = props;
  const [bet, setBet] = useState({ size: 0, result: ""});

  const navigate = useNavigate(); // Хук для управления навигацией

  const token = localStorage.getItem("jwt_token");
  const metadata = {
    authorization: token,
  };

  const handleBet = async () => {
    const request = new BetRequest();
    request.setSize(bet.size);
    
    request.setResult(EventResult[bet.result]);
    request.setEventId(eventId)

    client.bet(request, metadata, (err, response) => {
      if (err) {
        console.error("Ошибка добавления магазина:", err.message);
        alert("Ошибка добавления магазина:", err.message)
        return;
      }
      setBet({ size: 0, result: ""});
      onClose();
    });
  };

  return (
    <Dialog onClose={onClose} fullWidth aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">make a bet</DialogTitle>
      <StyledForm>
        <TextField
          label="Size"
          fullWidth
          value={bet.size}
          onChange={(e) => setBet({ ...bet, size: e.target.value })}
        />
        <RadioGroup
          row
          value={bet.result}
          onChange={(e) => setBet({ ...bet, result: e.target.value })}
        >
          <FormControlLabel
            value="YES"
            control={<Radio />}
            label="Да"
          />
          <FormControlLabel
            value="NO"
            control={<Radio />}
            label="Нет"
          />
          <FormControlLabel
            value="marketplace"
            control={<Radio />}
            label="Скип"
          />
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBet}
          sx={{ alignSelf: "flex-start" }}
        >
          Создать событие
        </Button>
      </StyledForm>
    </Dialog>

  );
};

export default BetForm;
