import { Router, type IRouter } from "express";
import healthRouter from "./health";
import cinematchRouter from "./cinematch";

const router: IRouter = Router();

router.use(healthRouter);
router.use(cinematchRouter);

export default router;
