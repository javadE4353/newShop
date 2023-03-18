
//User and admin

interface User{
    id:number
    firstname:string
    lastname:string
    username:string
    mobile:string
    email:string
    role:number
    registeredAt:string
    lastLogin:string
    profile:string
    intro?:string
    vender?:boolean
    image?:string
}

//ProductReview

interface ProductReview{
    id:number
    productId:number
    title:string
    rating:number
    published:string  //It can be used to identify whether the review is publicly available.
    createdAt:string
    publishedAt:string //It stores the date and time at which the review is published.
    content:string //The column used to store the review details.

}

//categorys
interface Categorys{
    id:number
    title:string
    metaTitle?:string
    slug?:string
    content?:string
    image?:string
}


//product
interface Product{
    id:number
    userId:number
    title:string
    type:string //The type to distinguish between the different product types.
    sku:number
    metaTilte?:string //The meta title to be used for browser title and SEO.
    price:number
    discount:number
    quantity:number
    shop:boolean //It can be used to identify whether the product is publicly available for shopping.
    description:string
    images?:string[]
    createdAt:string
    updatedAt:string
    publishedAt:string //It stores the date and time at which the product is published on the Shop.
    startsAt:string //It stores the date and time at which the product sale starts.
    endAt:string //It stores the date and time at which the product sale ends.
    content:string 
    category:string
    review?:ProductReview[]
}

interface Cart{
    userId:number
    sessionId?:string
    token:string //The unique token associated with the cart to identify the cart over multiple sessions. The same token can also be passed to the Payment Gateway if required.
    status:number //The status of the cart can be New, Cart, Checkout, Paid, Complete, and Abandoned.
    firstname:string
    username:string
    lastname:string
    mobile:string
    email:string
    line1:string //The first line to store address.
    line2?:string //The second line to store address.
    city:string
    province:string //The province of the address.
    createdAt:string
    updatedAt:string
    content?:string //The column used to store the additional details of the cart.
}

interface CartItem{
    productId:number
    cartId:number
    sku:number
    price:number
    discount:number
    quantity:number
    active:boolean //The flag to identify whether the product is active on the cart. It can be used to avoid the same product being added to the same cart multiple times.
    createdAt:string
    updatedAt:string
    content:string
}

interface Order{
    userId:number
    subTotal:number //The total price of the Order Items.
    itemDiscount:number
    tax:number //The tax on the Order Items.
    shippimg:number //The shipping charges of the Order Items.
    total:number //The total price of the Order including tax and shipping. It excludes the items discount.
    promo?:string //The promo code of the Order.
    discount:number //The total discount of the Order based on the promo code or store discount.
    grandTotal:number //The grand total of the order to be paid by the buyer.
}