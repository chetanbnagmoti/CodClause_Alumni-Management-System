const { commonrequest } = require("../ApiCall")
const { BASE_URL } = require("../helper")


export const collegepostfunc=async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/college/post`,data);
}

export const collegeupdatefunc=async(id,data)=>{
    return await commonrequest("POST",`${BASE_URL}/college/edit/${id}`,data)
}

export const collegegetfunc=async()=>{
    return await commonrequest("GET",`${BASE_URL}/college/get`);
}