import axios from "axios";


export default axios.create({
  baseURL: `https://ey-medicaid.onrender.com/api`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
})