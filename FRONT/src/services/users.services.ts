import { User } from "../interfaces/User.ts";
import axios from "axios";

export default class UserService {

    //Config axios
    api = axios.create({
        baseURL: "http://localhost:8080",
    });


  getUser(id: string): Promise<User> {
    return this.api
      .get(`/users/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  getUsers(): Promise<User[]> {
    return this.api
      .get("/users")
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  deleteUser(id: string): Promise<void> {
    return this.api
      .delete(`/users/${id}`)
      .then(() => {
        // Usuario eliminado correctamente
      })
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  login(user: User): Promise<User> {
    return this.api
      .post("/login", user)
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  signUp(user: User): Promise<User> {
    return this.api
      .post("/signup", user)
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  changePassword(user: User): Promise<User> {
    return this.api
      .put("/changePassword", user)
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }
}
