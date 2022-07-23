import { createSlice } from "@reduxjs/toolkit";

//New slice
const initialauthstate = {
  islogin: false,
  email: "",
  name:""
};

const authslice = createSlice({
  name: "authentication",
  initialState: initialauthstate,
  reducers: {
    login(state, action) {
      state.islogin = true;
      state.email = action.payload.email;
    },
    logout(state) {
      state.islogin = false;
    },
    signup(state, action) {
      state.islogin = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const authActions = authslice.actions;
export default authslice.reducer;
