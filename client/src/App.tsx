import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Context } from ".";

import LoginForm from "./components/loginForm";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getAllUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>
        {store.isAuth ? `Authorized ${store.user.email}` : "Not authorized"}
      </h1>
      <h1>
        {store.user.isActivated
          ? "Account is activated"
          : "Activate account on mail"}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={getAllUsers}>Get all users</button>

      {users.map((user) => {
        return <div key={user.id}>{user.email}</div>;
      })}
    </div>
  );
};

export default observer(App);
