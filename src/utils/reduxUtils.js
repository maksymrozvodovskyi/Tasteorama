export const handleError = (state, { payload, error }) => {
  state.isLoading = false;
  state.error = {
    message:
      payload?.response?.data?.message ||
      error?.message ||
      "Something went wrong",
    code: payload?.status || error?.code,
  };
};
