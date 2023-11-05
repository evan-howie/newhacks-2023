import { stackMiddlewares } from "@/middlewares/stackHandler";
import { checkAuth } from "@/middlewares/checkAuth";

// const middlewares = [checkAuth];
const middlewares = [];
export default stackMiddlewares(middlewares);
