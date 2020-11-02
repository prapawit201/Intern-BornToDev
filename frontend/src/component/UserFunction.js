import axios from "../config/base_axios";

export const register = (newUser) => {
  return axios
    .post("users/register", {
      fName: newUser.fName,
      username: newUser.username,
      password: newUser.password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      this.props.history.push(`/error`);
      return err;
    });
};

export const login = (user) => {
  return axios
    .post("users/login", {
      username: user.username,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
