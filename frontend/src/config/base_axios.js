import baseaxios from "axios";

const axios = baseaxios.create({
  baseURL: "http://localhost:5000",
});

export default axios;
