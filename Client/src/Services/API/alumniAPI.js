const { commonrequest } = require("../ApiCall")
const { BASE_URL } = require("../helper")

export const alumnigetfun=async(search,page)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details?search=${search}&page=${page}`,"");
}

