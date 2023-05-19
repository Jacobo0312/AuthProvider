import { User } from "../interfaces/User";
import '../styles/home.css';
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import { useNavigate } from 'react-router-dom';
import {Alert} from "@mui/material";
import {Snackbar} from "@mui/material";

const formatLastLogin = (date: Date) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm");
  return formattedDate;
};



const Home = () => {

  const navigate = useNavigate();
 

  const handleLogout = () =>{
    localStorage.removeItem('lastLogin');
    localStorage.removeItem('user');
    alert("La sesión ha sido cerrada correctamente");
    navigate("/");
   
      
  };
  
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
          <p className="userL">Username: {user.username}</p>
          <p className="lastL"> Last Login: {lastLogin}</p>
          <div className="Buttons-div">
          <Button variant="contained" onClick={handleOpen}>Change Password</Button>
          <span className="Button-spacing"></span>
          <Button variant="contained" onClick={handleLogout} color="error">Log out</Button>
          </div>
          {<div className="container_modal">
          <Modal open={open} onClose={handleClose}>
            <ChangePassword/>
          </Modal>
          </div>}
        </div>
      )}
    </div>
  );
}

export default Home;