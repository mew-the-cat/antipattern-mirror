import {Interest} from "../database/models/interest.model";
import express from "express";

export default class InterestController {
    static async getAll(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const interests = await Interest.findAll();

            return res.status(200).json(interests);
        } catch (error) {
            throw error;
        }
    }
}