// ! Shuold handle login/register and signout
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.url.includes("/admineditor")) {
        return token?.email === "admin@hotmail.com";
      }

      if (req.url.includes("/login") && token != null) {
        return false;
      } else if (req.url.includes("/register") && token != null) {
        return false;
      } else if (req.url.includes("/signout") && token == null) {
        return false;
      }
      return true;
    },
  },
});

// export const config = { matcher: ["/admineditor"] };
export const config = {
  matcher: ["/admineditor", "/signout", "/login", "/register"],
};
