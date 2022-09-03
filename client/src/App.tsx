import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Context } from ".";

import LoginForm from "./components/loginForm";

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  return (
    <div>
      <h1>
        {store.isAuth ? `Authorized ${store.user.email}` : "Not authorized"}
      </h1>
      <LoginForm />
    </div>
  );
};

export default observer(App);
