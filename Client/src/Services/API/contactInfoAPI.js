const { commonrequest } = require("../ApiCall")
const { BASE_URL } = require("../helper")


export const contactpostfunc=async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/contact/post`,data);
}

export const contactgetsinglefunc=async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/contact/get/${id}`,"");
}

export const contactupdatefunc=async(id,data)=>{
    return await commonrequest("POST",`${BASE_URL}/contact/edit/${id}`,data)
}

export const contactgetfunc=async()=>{
    return await commonrequest("GET",`${BASE_URL}/contact/get`);
}