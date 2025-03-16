import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { LoginRequest } from "../../grpc/auth/auth_pb";
import { useNavigate } from "react-router-dom";
import {
  Divider,
} from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "400px",
  margin: "0 auto",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const FormContainer = styled(Box)({
  position: "relative",
  maxWidth: 400,
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "2px",
    backgroundColor: "white",
  },
  "&::before": {
    left: -15,
  },
  "&::after": {
    right: -15,
  },
});

const LoginForm = ({ authClient }) => {
  const [formData, setFormData] = React.useState({
    login: "",
    password: "",
  });

  const [serverError, setServerError] = React.useState("");
  const navigate = useNavigate(); // Для навигации после успешного логина

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const login = () => {
    setServerError(""); // Очистка ошибки перед новым запросом

    const request = new LoginRequest();
    request.setLogin(formData.login);
    request.setPassword(formData.password);

    authClient.login(request, {}, (err, response) => {
      if (err) {
        setServerError(err.message || "Ошибка авторизации");
      } else {
        const jwtToken = response.getToken(); // Предположим, что токен приходит в ответе
        console.log(jwtToken)
        if (jwtToken) {
          // Сохраняем токен в localStorage
          localStorage.setItem("jwt_token", jwtToken);

          // Очистка ошибки при успешной авторизации
          setServerError(""); 

          // Перенаправление на страницу-пример
          navigate("/events");
        } else {
          setServerError("Токен не получен, повторите попытку.");
        }
      }
    });
  };

  return (
    <FormContainer>
      
    <StyledBox>
          {/* Заголовок системы */}
          <img 
              src="/Logo_black.png" 
              style={{ 
                width: 200,
                height: 200,
                
              }}
            />
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 800, 
          mb: 4,
          color: 'black',
          letterSpacing: '-0.5px'
        }}
      >
        Stavki Na Demisa
      </Typography>

      {/* Поля формы */}
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Логин"
            variant="outlined"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px',
                '& fieldset': { borderColor: 'black' },
              },
              '& .MuiInputLabel-root': { color: 'black' }
            }}
            InputProps={{
              style: { color: 'black' }
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px',
                '& fieldset': { borderColor: 'black' },
              },
              '& .MuiInputLabel-root': { color: 'black' }
            }}
            InputProps={{
              style: { color: 'black' }
            }}
          />
        </Grid>
      </Grid>

      {/* Блок ошибок */}
      {serverError && (
        <Alert 
          severity="error" 
          sx={{ 
            width: '100%', 
            mt: 3,
            borderRadius: '8px',
            bgcolor: '#ffebee',
            '& .MuiAlert-icon': { color: 'black' }
          }}
        >
          <Typography color="black">{serverError}</Typography>
        </Alert>
      )}

      {/* Кнопка входа */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={login}
        sx={{ 
          mt: 4, 
          py: 1.5,
          borderRadius: '8px',
          fontSize: '1rem',
          textTransform: 'none',
          backgroundColor: 'black',
          '&:hover': { backgroundColor: '#333' }
        }}
      >
        <Typography style={{ color: 'white' }}>Войти в систему</Typography>
      </Button>

      {/* Футер */}
      <Box sx={{ 
        mt: 6,
        textAlign: 'center',
      }}>
        <Typography variant="caption" sx={{ color: 'black' }}>
          © {new Date().getFullYear()} Brigada, Inc.
        </Typography>
      </Box>
    </StyledBox>
    </FormContainer>
  );
};

export default LoginForm;