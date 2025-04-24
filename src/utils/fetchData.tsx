import axios from "axios";
const fetchData = axios.create({
    baseURL : 'https://mern-real-dehi.onrender.com',
    withCredentials : true,
})

export default fetchData;