import React from "react";
import Auth from "./pages/Auth/Auth";

import { useSelector } from "react-redux/es/hooks/useSelector";
import Home from "./pages/Home/Home";
const App = () => {
const islogin = useSelector(state => state.auth.islogin);
  return (
      <div>
        {!islogin && <Auth />}
        {islogin && <Home/>}
      </div>
  );
};

export default App;
