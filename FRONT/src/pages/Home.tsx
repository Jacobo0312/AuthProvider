import { User } from "../interfaces/User";
import '../styles/home.css';
import { Button } from "@mui/material";
import {TextField} from "@mui/material";
import React from "react";

import { Modal } from "@mui/material";

import dayjs from "dayjs";
import { useState } from "react";
import ChangePassword from "./ChangePassword";


const formatLastLogin = (date: Date) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm");
  return formattedDate;
};



const Home = () => {
  const [showTextFields, setShowTextFields] = React.useState(false);

  const handleButtonClick = () => {
    setShowTextFields(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const lastLogin = user ? formatLastLogin(user.lastLogin!) : null;

  return (
    <div className="Home">
      <h1>Home</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Last Login: {lastLogin}</p>
          <div className="Buttons-div">
          <Button variant="contained" onClick={handleButtonClick}>Change Password</Button>
          <span className="Button-spacing"></span>
          <Button variant="contained" color="error">Log out</Button>
          </div>
          {showTextFields && (
            <div className="TextFields-container">
              <TextField label="Current password" />
              <TextField label="New password" />
            </div>
          )}
          <button onClick={handleOpen}>Cambiar contraseña</button>
          <div className="container_modal">
          <Modal open={open} onClose={handleClose}>
            <ChangePassword/>
          </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
