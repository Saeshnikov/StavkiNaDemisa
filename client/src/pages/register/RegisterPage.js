import React from "react";
import LoginForm from "./LoginForm";
import { AuthClient } from "../../grpc/auth/auth_grpc_web_pb";
import "./App.css";

const authClient = new AuthClient("http://localhost:8000");

const RegisterPage = () =>  {

  return (
    <div className="app-container">
      
      <LoginForm
        authClient={authClient}
      />
    </div>
  );
}

export default RegisterPage;
