import { User } from "../interfaces/User";

import dayjs from "dayjs";

const formatLastLogin = (date: Date) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD HH:mm");
  return formattedDate;
};

const Home = () => {
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
        </div>
      )}
    </div>
  );
};

export default Home;
