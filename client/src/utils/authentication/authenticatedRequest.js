import axios from "axios";
import setAuthToken from "./setAuthToken";
import {refreshToken} from "./refreshToken";

export const authenticatedPostRequest = async (url, body) => {
    if(!localStorage.getItem('refreshToken'))    return logout();
    let config = {headers:{refreshToken : await localStorage.getItem('refreshToken')}}
    return axios
        .post(url, body, config)
        .then((res) => {
            res.data = {...res.data, ...res.data.data}
            if(res.data.newAccessToken){
                setAuthToken(res.data.newAccessToken);
                localStorage.setItem('accessToken', res.data.newAccessToken)
            }
            return res
        })
        .catch(async (e) => {
            if (e.response.status === 403) {
                await logout();
            }
            throw e.response.data
        })
}

export const authenticatedGetRequest = async (url) => {
    if(!localStorage.getItem('refreshToken'))    return logout();
    let config = {headers:{refreshToken : await localStorage.getItem('refreshToken')}}
    return axios
        .get(url, config)
        .then((res) => {
            res.data = {...res.data, ...res.data.data}
            if(res.data.newAccessToken){
                setAuthToken(res.data.newAccessToken);
                localStorage.setItem('accessToken', res.data.newAccessToken)
            }
            return res
        })
        .catch(async (e) => {
            if (e.response.status === 403) {
                await logout();
            }
            throw e.response.data
        })
}

const logout = async () =>{
    await localStorage.removeItem("accessToken")
    await localStorage.removeItem("refreshToken");
    window.location.reload();
}
