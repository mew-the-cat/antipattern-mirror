import { Router } from "express";
import MatchController from "../../controllers/match.controller";

const routes = Router();

// Stage 1. Recommend a tailored advisor profile to the calling cliematnt
routes.get("/match/:clientId", MatchController.getRecommendation);

// Stage 2. The client (identified by the client ID) want to initiate the match (with the advisor of the given advisor ID)
routes.post("/match/:clientId/:advisorId", MatchController.initiateMatch);

// Stage 3. The advisor wants to accepts the client (using the match ID)
routes.post("/match/accept/:matchId", MatchController.acceptMatch);

export default routes;
