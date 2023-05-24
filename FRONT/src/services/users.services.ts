import { ChangePasswordRequest } from "../interfaces/ChangePasswordRequest.ts";
import { User } from "../interfaces/User.ts";
import axios, { Axios, AxiosResponse } from "axios";

export default class UserService {
  // Configurar axios
  api = axios.create({
    baseURL: "http://localhost:8080",
  });

  private saveToken(token: string) {
    localStorage.setItem("token", token); // Guardar el token en el LocalStorage
  }

  private getToken(): string | null {
    return localStorage.getItem("token"); // Obtener el token del LocalStorage
  }

  private clearToken() {
    localStorage.removeItem("token"); // Eliminar el token del LocalStorage
  }

  private getHeaders() {
    const token = this.getToken();
    if (token) {
      return { Authorization: `Bearer ${token}` }; // Agregar el token JWT al encabezado
    }
    return {};
  }

  getUser(username: string): Promise<User> {
    return this.api
      .get(`/users/${username}`, { headers: this.getHeaders() })
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  getUsers(): Promise<User[]> {
    return this.api
      .get("/users", { headers: this.getHeaders() })
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  deleteUser(username: string): Promise<AxiosResponse> {
    return this.api
      .delete(`/users/${username}`, { headers: this.getHeaders() })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  login(user: User): Promise<AxiosResponse> {
    return this.api
      .post("/users/login", user)
      .then((response) => {
        const token = response.data; // Obtener el token JWT de la respuesta
        this.saveToken(token); // Guardar el token en el LocalStorage
        return response;
      })
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  signUp(user: User): Promise<AxiosResponse> {
    return this.api
      .post("/users/signup", user)
      .then((response) => {
        const token = response.data; // Obtener el token JWT de la respuesta
        this.saveToken(token); // Guardar el token en el LocalStorage
        return response;
      })
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  changePassword(username: string, request: ChangePasswordRequest): Promise<User> {
    return this.api
      .put(`/users/changePassword/${username}`, request, { headers: this.getHeaders() })
      .then((response) => response.data)
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  logout() {
    this.clearToken(); // Eliminar el token del LocalStorage al cerrar sesión
  }
}
