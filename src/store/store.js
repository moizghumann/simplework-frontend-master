import { configureStore } from "@reduxjs/toolkit";
import gigreducer from "./Slices/gigslice";
import userReducer from "./Slices/userSlice"
import singlegigreducer from "./Slices/singlegigslice"

export const store = configureStore({
  reducer: {
    gig: gigreducer,
    singlegig: singlegigreducer,
    user: userReducer,
  },
});

