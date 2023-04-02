
export const conditionGetAllCart=(token:string|undefined,userId:number | null,Op:any):any=>{
    let option;
       if(token && !userId){
           option={token:{[Op.substring]:token}}
       }else if(userId && !token){
        option={userId:userId}
       }else if(userId && token){
         option={
            token:{[Op.substring]:token},
            userId:userId
         }  
       }
        else{
           option=undefined
       }
       return option
   }