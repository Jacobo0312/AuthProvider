import { User } from "../interfaces/User";
import "../styles/home.css";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";
import UserService from "../services/users.services";

const formatLastLogin = (date: Date) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm");
  return formattedDate;
};

const Home = () => {
  const navigate = useNavigate();
  const userService = new UserService();
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    userService.logout();
    alert("La sesión ha sido cerrada correctamente");
    navigate("/");
  };

  const handleShowUsers = () => {
    navigate("/users");
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      userService.getUser(username).then((response) => {
        const user = response as User;
        console.log(user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      });
    }
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>
      {user && (
        <div>
          <p className="userL">Username: {user.username}</p>
          <p className="lastL">
            {" "}
            Last Login: {formatLastLogin(user.lastLogin!)}
          </p>
          <div className="Buttons-div">
            <Button variant="contained" onClick={handleOpen}>
              Change Password
            </Button>
            <span className="Button-spacing"></span>
            <Button variant="contained" onClick={handleLogout} color="error">
              Log out
            </Button>
            <span className="Button-spacing"></span>
            {user.username === "admin" && (
              <Button variant="contained" color="success" onClick={handleShowUsers} >
                Show users
              </Button>
            )}
          </div>
          {
            <div className="container_modal">
              <Modal open={open} onClose={handleClose}>
            <ChangePassword/>
          </Modal>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Home;
