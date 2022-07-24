import { createSlice } from "@reduxjs/toolkit";

//New slice
const initialauthstate = {
  islogin: false,
  email: "",
  name: "",
  signup: [],
  isshow: false,
};

const authslice = createSlice({
  name: "authentication",
  initialState: initialauthstate,
  reducers: {
    login(state, action) {
      state.islogin = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isshow = false;
    },
    logout(state) {
      state.islogin = false;
      state.email = "";
      state.name = "";
      state.isshow = false;
    },
    signup(state, action) {
      var x = {};
      console.log(action);
      x.email = action.payload.email;
      x.name = action.payload.name;
      x.password = action.payload.password;
      state.isshow = true;
      state.signup.push(x);
    },
  },
});

export const authActions = authslice.actions;
export default authslice.reducer;
