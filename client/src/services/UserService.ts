import $api from "../http/index";
import { AxiosResponse } from "axios";

import { IUser } from "../models/IUser";

export default class AuthService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}
