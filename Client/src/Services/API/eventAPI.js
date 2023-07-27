import { commonrequest } from "../ApiCall";
import { BASE_URL } from "../helper";

export const eventAddfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/event/add`,data,header);
}

export const eventsgetfunc=async(search,page)=>{
    return await commonrequest("GET",`${BASE_URL}/events/get?search=${search}&page=${page}`,"");
}

export const eventdeletefunc=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/event/delete/${id}`,{});
}

export const singleEventgetfunc=async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/event/get/${id}`,"");
}

export const eventupdatefunc=async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/event/edit/${id}`,data,header);
}