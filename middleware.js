import { NextResponse } from "next/server";

export function middleware(req) {
    // retrieve the current response
 const url = req.nextUrl.pathname;

    if(url?.startsWith("/api")){
        NextResponse.next().headers.append("Access-Control-Allow-Origin","*")
      }
}


export const config = {
    matcher: '/api/:path*',
}
