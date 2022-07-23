import React, { useRef, useState } from "react";
import bg from "../../assets/login-background.png";
import "./Auth.css";
import { authActions } from "../../redux/auth";
import { useDispatch } from "react-redux/es/exports";
const Auth = () => {
  const [islogin, setislogin] = useState(true);
  const dispatch = useDispatch();
  const emailref = useRef(),
    nameref = useRef(),
    passwordref = useRef();
  const handleauth = () => {
    if (islogin) {
      dispatch(
        authActions.login({
          email: emailref.current.value,
          password: passwordref.current.value,
        })
      );
    } else {
    }
  };
  return (
    <div>
      <div className="authpage">
        <img src={bg} />
        <div className="auth-form">
          <div className="bar">
            <ul>
              <li onClick={() => setislogin(true)}>Login</li>
              <li onClick={() => setislogin(false)}>Signup</li>
            </ul>
          </div>
          <div className="hr"></div>
          <div className="ingo">
            {" "}
            <h4>To Continue</h4>
            <p>We need your Name and Email</p>
          </div>

          <form style={{ height: islogin ? "181px" : "249px" }}>
            {islogin && (
              <>
                <input placeholder="Email" type="email" ref={emailref} />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordref}
                />
              </>
            )}
            {!islogin && (
              <>
                <input type="text" placeholder="Name" ref={nameref} />
                <input type="email" placeholder="Email" ref={emailref} />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordref}
                />
              </>
            )}{" "}
            <button onClick={handleauth}>
              {islogin ? "Log In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
