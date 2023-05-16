import axios from "axios";
import setAuthToken from "./setAuthToken";
import {useHistory} from "react-router-dom";
import {baseURL} from "../../CONSTANTS";

export const refreshToken = async () =>{
    if(!localStorage.getItem('refreshToken'))return;
    await (axios
        .post(baseURL + "/api/authentication/refreshToken", {refreshToken:localStorage.getItem('refreshToken')})
        .then((res)=>{
            const { accessToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            setAuthToken(accessToken);
            return
        })
        .catch(()=>{
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken");
            window.location.reload();
        }))
}
