import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'https://json-server-redux-production.up.railway.app'
})

export default clienteAxios;