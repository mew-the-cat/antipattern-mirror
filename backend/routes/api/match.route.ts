import { Router } from "express";
import MatchController from "../../controllers/match.controller";

const routes = Router();

// Stage 1. Recommend a tailored advisor profile to the calling client
routes.get("/match", MatchController.getRecommendation);

// Stage 2. The client wants to match the advisor (with the given ID)
routes.post("/match/byclient/:advisorId", MatchController.initiateMatch);

// Stage 3A. The advisor wants to accepts the client (with the given ID)
routes.post("/match/byadvisor/:matchId/accept", MatchController.acceptMatch);

// Stage 3B. The advisor wants to accepts the client (with the given ID)
routes.post("/match/byadvisor/:matchId/decline", MatchController.declineMatch);

export default routes;
