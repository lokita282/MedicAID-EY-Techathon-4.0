import axios from "axios";


export default axios.create({
  //development urL
  // baseURL: `http://localhost:5000/api`,

  //production urL
  // baseURL: `https://ey-ml-backend.onrender.com`,
  baseURL: `https://c2c1-2405-201-6-41fd-a4a5-84d4-df7d-45dd.ngrok-free.app/`,


  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
})