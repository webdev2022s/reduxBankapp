import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fullnameNationalId: {
      prepare(name, id) {
        return { payload: { name, id, createdAt: new Date().toISOString() } };
      },

      reducer(state, action) {
        state.fullname = action.payload.name;
        state.nationalID = action.payload.id;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullname = action.payload;
    },
  },
});

export const { fullnameNationalId } = customerReducer.actions;

export default customerReducer.reducer;
