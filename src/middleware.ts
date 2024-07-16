import { withAuth } from "next-auth/middleware";

export default withAuth(
	
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token, "Request in middleware");
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.email === "admin@hotmail.com",
    },
  }
);

export const config = { matcher: ["/admineditor"] };
