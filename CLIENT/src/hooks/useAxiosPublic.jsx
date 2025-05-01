import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://nexcall-vfak.onrender.com'
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;