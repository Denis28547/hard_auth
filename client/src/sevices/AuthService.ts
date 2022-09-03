import $api from "../http/index.js";
import { AxiosResponse } from "axios";

import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api
      .post("/registration", { email, password })
      .then((response: AxiosResponse) => console.log(response));
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
