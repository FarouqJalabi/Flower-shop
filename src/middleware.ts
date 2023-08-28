import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  //
  function middleware(req) {
    const token = req.nextauth.token;
    if (req.url.includes("/login") && token != null) {
      return NextResponse.redirect(new URL("/signout", req.url));
    } else if (req.url.includes("/register") && token != null) {
      return NextResponse.redirect(new URL("/signout", req.url));
    } else if (req.url.includes("/signout") && token == null) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.url.includes("/admineditor")) {
          return token?.email === "admin@hotmail.com";
        }

        return true;
      },
    },
  }
);
export const config = {
  matcher: ["/admineditor", "/signout", "/login", "/register"],
};
