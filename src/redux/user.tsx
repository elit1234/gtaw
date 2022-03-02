import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const initialState = {
  selectedFaction: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFaction(state, action) {
      return {
        ...state,
        selectedFaction: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.user,
    }),
  },
});

export const { setFaction } = userSlice.actions;

export const useAppDispatch = () => useDispatch();
