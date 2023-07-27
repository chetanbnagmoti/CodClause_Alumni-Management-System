import { commonrequest } from "../ApiCall";
import { BASE_URL } from "../helper";

export const courseaddfunc=async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/course/add`,data);
}

export const coursegetfun =async(search,page)=>{
    return await commonrequest("GET",`${BASE_URL}/course/get?search=${search}&page=${page}`,"");
}

export const coursedeletefun=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/course/delete/${id}`,{});
}

export const singlecoursegetfun=async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/course/get/${id}`,"");
}

export const updatecoursefun=async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/course/edit/${id}`,data)
}