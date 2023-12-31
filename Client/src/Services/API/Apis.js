import { commonrequest } from "../ApiCall";
import { BASE_URL } from "../helper";

export const registerfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

export const usergetfun =async(search,gender,status,sort,page)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"");
}

export const userloginfunc=async(data)=>{
     return await commonrequest("POST",`${BASE_URL}/user/login`,data);
}

export const userforgotpasswordfun=async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/user/forgot-password`,data);
}

export const singleuserget=async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"");
}

export const editfunc=async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}

export const deletefunc=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/user/delete/${id}`,{});
}

export const statuschangefunc=async(id,data)=>{
    return await commonrequest("Put",`${BASE_URL}/user/status/${id}`,{data});
}

export const exporttocsvfunc=async ()=>{
    return await commonrequest("Get",`${BASE_URL}/userexport`);
}