import { chain } from "./app/middlewares/chain";
import { withAuthMiddleware } from "./app/middlewares/withAuthMiddleware";

export default chain([withAuthMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
