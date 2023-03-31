
export const conditionGetAllCart=(status:string|undefined,userId:number | null,Op:any):any=>{
    let option;
       if(status && !userId){
           option={status:{[Op.substring]:status}}
       }else if(userId && !status){
        option={userId:userId}
       }else if(userId && status){
         option={
            status:{[Op.substring]:status},
            userId:userId
         }  
       }
        else{
           option=undefined
       }
       return option
   }