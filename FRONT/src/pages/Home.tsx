import { User } from "../interfaces/User";
import { Modal } from "@mui/material";

import dayjs from "dayjs";
import { useState } from "react";

const formatLastLogin = (date: Date) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm");
  return formattedDate;
};

const Home = () => {
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
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Last Login: {lastLogin}</p>
          <button onClick={handleOpen}>Cambiar contraseña</button>
          {/* <Modal open={open} onClose={handleClose}>
             //Agregar modal que pida la contraseña y la nueva
          </Modal> */}
        </div>
      )}
    </div>
  );
};

export default Home;
