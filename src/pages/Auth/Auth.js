import React, { useEffect, useRef, useState } from "react";
import bg from "../../assets/login-background.png";
import errorimg from "../../assets/error.png";
import "./Auth.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { authActions } from "../../redux/auth";
import { useDispatch } from "react-redux/es/exports";
const Auth = () => {
  const [islogin, setislogin] = useState(true);
  const dispatch = useDispatch();
  const emailref = useRef(),
    nameref = useRef(),
    passwordref = useRef();
  const [error, seterror] = useState("");

  const auth = useSelector((state) => state.auth);
  const validate = (email, name, password) => {
    if (!islogin && name.length == 0) {
      seterror("Name is required");
    } else if (email.length == 0 || email.includes("@") == false) {
      seterror("Email is required or Invalid");
    } else if (password.length == 0 || password.length < 6) {
      seterror("Password must be atleast 6 characters long");
    } else {
      return true;
    }
    return false;
  };
  var checkissignup = (email, password) => {
    var x = auth.signup.find((x) => x.email == email && x.password == password);
    if (!x) {
      return null;
    }
    return x;
  };
  const handleauth = (e) => {
    e.preventDefault();
    var x = validate(
      emailref.current.value,
      nameref.current && nameref.current.value,
      passwordref.current.value
    );
    if (!x) return;
    seterror("");
    if (islogin) {
    
     
      var x = checkissignup(emailref.current.value, passwordref.current.value);
      if (!x) {
        seterror("Invalid email or password");
        return;
      }
      var remember = document.getElementById("remember");
      if (remember.checked) {
        localStorage.setItem("email", emailref.current.value);
        localStorage.setItem("password", passwordref.current.value);
      }

      dispatch(
        authActions.login({
          email: emailref.current.value,
          password: passwordref.current.value,
          name: x.name,
        })
      );
    } else {
      var x=auth.signup.find((x)=>x.email==emailref.current.value)
      if(x){
        seterror("Email already exists");return;
      }
      dispatch(
        authActions.signup({
          name: nameref.current.value,
          email: emailref.current.value,
          password: passwordref.current.value,
        })
      );
      nameref.current.value = "";
      emailref.current.value = "";
      passwordref.current.value = "";
    }
  };
  return (
    <div>
      <div className="authpage">
        <img src={bg} />
        <div className="auth-form">
          <div className="bar">
            <ul>
              <li
                className={`${islogin ? "active" : ""}`}
                onClick={() => {
                  seterror("");
                  setislogin(true);
                }}
              >
                <p>Login</p>
                {islogin && <div className="bar-underline"></div>}
              </li>
              <li
                className={`${!islogin ? "active" : ""}`}
                onClick={() => {
                  seterror("");
                  setislogin(false);
                }}
              >
                <p>Signup</p>
                {!islogin && <div className="bar-underline"></div>}
              </li>
            </ul>
          </div>
          <div className="hr"></div>
          <div className="ingo">
            {" "}
            <h4>To Continue</h4>
            <p>We need your Name and Email</p>
          </div>
          {!islogin && auth.isshow && (
            <div className="message">You can Sign in Now!</div>
          )}
          <form style={{ height: islogin ? "181px" : "249px" }}>
            {islogin && (
              <>
                <input
                  placeholder="Email"
                  style={{
                    borderColor:
                      error === "Email is required or Invalid"
                        ? "#F65B2A"
                        : "black",
                  }}
                  type="email"
                  ref={emailref}
                />
                <input
                  style={{
                    borderColor:
                      error === "Password must be atleast 6 characters long"
                        ? "#F65B2A"
                        : "black",
                  }}
                  type="password"
                  placeholder="Password"
                  ref={passwordref}
                />
              </>
            )}
            {!islogin && (
              <>
                <input
                  type="text"
                  style={{
                    borderColor:
                      error === "Name is required" ? "#F65B2A" : "black",
                  }}
                  placeholder="Name"
                  ref={nameref}
                />
                <input
                  type="email"
                  style={{
                    borderColor:
                      error === "Email is required or Invalid"
                        ? "#F65B2A"
                        : "black",
                  }}
                  placeholder="Email"
                  ref={emailref}
                />
                <input
                  style={{
                    borderColor:
                      error === "Password must be atleast 6 characters long"
                        ? "#F65B2A"
                        : "black",
                  }}
                  type="password"
                  placeholder="Password"
                  ref={passwordref}
                />
              </>
            )}{" "}
            {error.length > 0 && (
              <div className="error">
                <img src={errorimg} /> <p>{error}</p>
              </div>
            )}
            <button style={{ cursor: "pointer" }} onClick={handleauth}>
              {islogin ? "Log In" : "Sign Up"}
            </button>
            {islogin && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                  width: "100%",
                  position: "relative",
                  top: "10px",
                  right: "15px",
                }}
              >
                <input
                  style={{ width: "10px", height: "10px" }}
                  type="checkbox"
                  id="remember"
                  name="rember"
                />
                <label htmlFor="remember" style={{ cursor: "pointer" }}>
                  {" "}
                  Remember me
                </label>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
