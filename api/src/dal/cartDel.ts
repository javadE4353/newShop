import { Op, Transaction } from "sequelize"
import { CartInput } from "../models/bo/Cart.js"
import { Cart, CartItems, Role, User } from "../models/index.js"
import { sequelize } from "../models/sequelize.js"
import { conditionGetAllCart } from "./dataSort/helperCartDel.js"

//CreateCart
export const CreateCart=async(data:CartInput,t:Transaction):Promise<number>=>{
    const create=await Cart.create(data,{transaction:t})
    return create?create.toJSON().id:0

}


//GetCartByToken
export const GetCartByToken=async(token:string,t?:Transaction)=>{
    const cart=await Cart.findOne({
        where:{token},
        include:[
            {
                 model:CartItems,

            },
            {
                model:User,
                attributes:{exclude:["password","createdAt","updatedAt"]},
                include:[
                    {
                        model:Role,
                        attributes:["name"],
                    }
                ]
                
            }
        ],
        transaction:t?t:null
    })
    return cart?cart:false
}


//GetCartByUserId
export const GetCartByUserId=async(userId:number)=>{
    const cart=await Cart.findOne({
        where:{userId},
        include:[
            {
                model:CartItems,

           },
            {
                model:User,
                attributes:{exclude:["password","createdAt","updatedAt"]},
                include:[
                    {
                        model:Role,
                        attributes:["name"],
                    }
                ]
                
            }
        ]
    })
    return cart?cart:false

} 
//GetAllCart
export const GetAllCart=async(token:string,userId:number)=>{
    const cart=await Cart.findAll({
        where:conditionGetAllCart(token,userId,Op),
        include:[
            {
                model:CartItems,

           },
            {
                model:User,
                attributes:{exclude:["password","createdAt","updatedAt"]},
                include:[
                    {
                        model:Role,
                        attributes:["name"],
                    }
                ]
                
            }
        ]
    })
    return cart?cart:false
} 


//DeleteCart
export const DeleteCart=async(token:string,t:Transaction)=>{
    const remove=await Cart.destroy({where:{token},transaction:t})
    return !!remove?true:false
}


//AddItemsInCart
