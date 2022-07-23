// import {createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authslicereducer from "./auth";
const store = configureStore({
  reducer: { auth: authslicereducer}, //redux wants one main reducer function
});

export default store;
