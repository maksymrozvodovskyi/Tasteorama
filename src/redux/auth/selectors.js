export const selectUser = ({ auth }) => auth.user;
/* Приклад:
export const selectError = (state) => state.error;
 */
export const selectAuthToken = (state) => state.auth.accessToken;
export const selectAuthIsLoggedIn = (state) => Boolean(state.auth.accessToken);


export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
// export const selectAuthUser = (state) => state.auth.user;