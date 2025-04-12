import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://nexcall.up.railway.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
}

export default useAxiosSecure;