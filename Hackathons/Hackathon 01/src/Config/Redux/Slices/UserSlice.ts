import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Username: "",
  Email: "",
  Password: "",
  Uid: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        Username: action.payload.username,
        Email: action.payload.email,
        Password: action.payload.password,
        Uid: action.payload.uid,
      };
    },
    delUser: () => {
      return initialState;
    }
  },
});

export const { setUser, delUser } = UserSlice.actions;

export default UserSlice.reducer;