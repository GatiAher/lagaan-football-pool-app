const AdminUser = process.env.REACT_APP_ADMIN_USER;
const AdminPassword = process.env.REACT_APP_ADMIN_PASS;

export default {
  // called when the user attempts to log in
  login: ({ username, password }: { username: string; password: string }) => {
    if (username === AdminUser && password === AdminPassword) {
      localStorage.setItem("username", username);
      return Promise.resolve();
    }
    return Promise.reject();
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
