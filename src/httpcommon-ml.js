import axios from "axios";


export default axios.create({
  //development urL
  // baseURL: `http://localhost:5000/api`,

  //production urL
  baseURL: `https://ey-ml-backend.onrender.com`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
})