import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Set token to headers so it will be set to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
