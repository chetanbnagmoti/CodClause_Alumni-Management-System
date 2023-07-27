import { commonrequest } from "../ApiCall";
import { BASE_URL } from "../helper";

export const jobaddfunc=async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/job/add`,data);
}

export const jobgetfunc=async(search,page)=>{
    return await commonrequest("GET",`${BASE_URL}/jobs/get?search=${search}&page=${page}`,"");
}

export const jobdeletefun=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/job/delete/${id}`,{});
}

export const singlejobgetfun=async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/job/get/${id}`,"");
}

export const updatejobfun=async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/job/edit/${id}`,data);
}