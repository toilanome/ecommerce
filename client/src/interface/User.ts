export interface User{
    _id? : number | string,
    name: string,
    email:string,
    mobile:string,
    password:string,
}

export interface IProduct{
    _id? : number | string,
    title: string,
    price:number,
    brand:string,
    slug:string,
    description : string,
    images: string,
    color?:string,
    category: any,
    total : number
}