import {Router} from "express";
import InterestController from "../../controllers/interest.controller";

const routes = Router();

routes.get('/interest', InterestController.getAll);

export default routes;