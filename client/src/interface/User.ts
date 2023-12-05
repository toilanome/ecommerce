export interface User{
    _id? : number | string,
    name: string,
    email:string,
    mobile:string,
    password:string
}

export interface IProduct{
    response(response: any): unknown
    _id? : number | string,
    tilte: string,
    price:number,
    brand:string,
    slug:string,
    description : string,
    images: string
}