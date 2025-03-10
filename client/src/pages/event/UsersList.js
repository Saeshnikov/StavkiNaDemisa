import React, { useState, useEffect } from "react";
import { UserClient } from "../../grpc/user/user_grpc_web_pb"; // Клиент gRPC
import { 
  ListUsersRequest, 
  UserInfo
} from "../../grpc/user/user_pb"; // Сгенерированные сообщения
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';
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

// Стили для карточек магазинов
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

const  columns = [
    { 
        field: 'id',
        width: 0,
        valueGetter: (value, row) => row.userId,
        hideable: true,
    },
    {
      field: 'login',
      headerName: 'User',
      width: 150,
    },
    {
      field: 'balance',
      headerName: 'Balance',
      width: 150,
    }
]

const UsersList = (props) => {
  const client = new UserClient("http://localhost:8002"); // URL gRPC-сервера

  const [users, setUsers] = useState([]);
  const { onClose, open } = props;

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate(); // Хук для управления навигацией

  const token = localStorage.getItem("jwt_token");
  const metadata = {
    authorization: token,
  };

  const fetchUsers = async () => {
    const request = new ListUsersRequest();
    client.listUsers(request, metadata, (err, response) => {
      if (err) {
        console.error("Ошибка загрузки списка пользователей:", err.message);
        return;
      }
      setUsers(response.getInfoList().map((user) => user.toObject()));
    });
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Users list</DialogTitle>
        <Box sx={{height: '90vh', width: '100%', maxWidth: columns.reduce((acc, column) => acc + column.width, 0)}}>
      <DataGrid
        rows={users}
        columns={columns}
        disableRowSelectionOnClick
        autoPageSize
        initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              },
            },
          }}
        disableColumnSelector
        disableColumnResize
        disableColumnFilter
        disableColumnMenu
        disableExtendRowFullWidth
        density="compact"
      />
    </Box>

    </Dialog>

  );
};

export default UsersList;
