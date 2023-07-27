import { commonrequest } from "../ApiCall";
import { BASE_URL } from "../helper";

export const gallaryAddfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/gallery/add`,data,header);
}

export const gallarygetfun =async(search,page)=>{
    return await commonrequest("GET",`${BASE_URL}/gallery/get?search=${search}&page=${page}`,"");
}

export const gallaerydeletefun=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/gallery/delete/${id}`,{});
}

export const singlegallaryget=async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/gallery/get/${id}`,"");
}

export const gallaryeditfunc=async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/gallery/edit/${id}`,data,header);
}