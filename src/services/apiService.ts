import axios from "axios";

const api = axios.create({
  baseURL: "https://meubarfavorito.herokuapp.com/"
});

export default api;
