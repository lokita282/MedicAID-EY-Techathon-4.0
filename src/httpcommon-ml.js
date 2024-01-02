import axios from "axios";


export default axios.create({
  //development urL
  // baseURL: `http://localhost:5000/api`,

  //production urL
  // baseURL: `https://ey-ml-backend.onrender.com`,
  baseURL: `https://2b93-2405-201-6-41fd-dcde-241d-807a-ecad.ngrok-free.app`,


  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
})