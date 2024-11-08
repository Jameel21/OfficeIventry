


import axios from "axios";
import { error } from "console";



export const instance  = axios.create({
    baseURL:"https://672388ca493fac3cf24b474f.mockapi.io"
})

instance.interceptors.request.use(config=>{
    
    return config
})


instance.interceptors.response.use(response=>{

    return response;
},error=>{
    if(error.response &&error.response.status===401){

    }else{
        return Promise.reject(error)
    }
});