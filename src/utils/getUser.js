export const getCurrentUser = () => {
  const currenUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))  ;

  const user = {
    user: currenUser?.user,
    token: currenUser?.token,
  };

  return user.user && user;
};
