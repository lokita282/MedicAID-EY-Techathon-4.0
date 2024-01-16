import axios from "axios";


export default axios.create({
  //development urL
  // baseURL: `http://localhost:5000/api`,

  //production urL
  // baseURL: `https://ey-ml-backend.onrender.com`,
  baseURL: `https://148d-2405-201-6-41fd-3850-974-900-bc4c.ngrok-free.app/`,


  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
})