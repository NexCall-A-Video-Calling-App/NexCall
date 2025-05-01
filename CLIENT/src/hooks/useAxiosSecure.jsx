import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://nexcall-vfak.onrender.com'
})

const useAxiosSecure = () => {
    return axiosSecure;
}

export default useAxiosSecure;