export const selectUser = ({ auth }) => auth.user;
/* Приклад:
export const selectError = (state) => state.error;
 */

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;