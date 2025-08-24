import { configureStore } from "@reduxjs/toolkit";

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  /* reducer: {
    Таска: ТаскаReducer,
  } */
});
