import NextAuth from "next-auth"
import { options } from "./options"

const handler = NextAuth(options )

export default NextAuth()
export { handler as GET, handler as POST}