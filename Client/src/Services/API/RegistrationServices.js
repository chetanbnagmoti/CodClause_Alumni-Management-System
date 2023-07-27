import { BASE_URL } from "../helper";

class RegistrationServices{
    collectData = async (name,email,password,mobile,is_varified,is_admin) => {
        let result = await fetch(`${BASE_URL}/register`, {
          method: "post",
          body: JSON.stringify({ name, email, password ,mobile,is_varified,is_admin}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        return result ;
        
      };

      handleLogin=async(email,password)=>{
        let result=await fetch(`${BASE_URL}/login`,{
           method:'post',
           body:JSON.stringify({email,password}),
           headers:{
               'Content-Type':'application/json'
           }
        });
        result=await result.json();
        return result;
        
      }; 

      handleResetPassword = async (email,mobile,newPassword) => {
        let result = await fetch(`${BASE_URL}/forgot`, {
          method: "put",
          body: JSON.stringify({ email, mobile, newPassword }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        result = await result.json();
        return result;
      };

      


}

export default new RegistrationServices();