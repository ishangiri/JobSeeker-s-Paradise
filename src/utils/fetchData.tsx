import axios from "axios";
const fetchData = axios.create({
    baseURL : 'http://localhost:3000/',
    withCredentials : true,
})

export default fetchData;