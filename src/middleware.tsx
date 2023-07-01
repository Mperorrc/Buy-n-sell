import { NextRequest, NextResponse } from "next/server";
 
export function middleware(req:NextRequest,res:NextResponse){
    const response =NextResponse.next();
    response.cookies.set("isAuth","true")
    console.log("response",response.cookies)
    return NextResponse.next();
}
 
export const config={
    matcher:"/",
}