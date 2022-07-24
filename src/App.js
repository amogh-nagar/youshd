import React, { useEffect } from "react";
import Auth from "./pages/Auth/Auth";
import {useDispatch} from "react-redux";
import { authActions } from "./redux/auth";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Home from "./pages/Home/Home";
const App = () => {
  const islogin = useSelector((state) => state.auth.islogin);
  const dispatch=useDispatch()
  useEffect(() => {
    var email = localStorage.getItem("email");
    var password = localStorage.getItem("password");
    console.log(email)
    if (!email || !password || email.length == 0 || password.length == 0) {
      return;
    }
    dispatch(
      authActions.login({
        email: email,
        password: password,
      })
    );
  }, []);

  return (
    <div>
      {!islogin && <Auth />}
      {islogin && <Home />}
    </div>
  );
};

export default App;
