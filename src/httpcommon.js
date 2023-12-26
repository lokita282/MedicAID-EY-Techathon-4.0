import axios from "axios";


export default axios.create({
  //development urL
  baseURL: `http://localhost:5000/api`,

  //production urL
  // baseURL: `https://ey-medicaid.onrender.com/api`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
})