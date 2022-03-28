/**
 * Middleware to check user's rol
 * 
 * @since 1.0.0
 * @version 1.0.0
 */


import { Request, Response, NextFunction } from "express";

import User from "../models/user";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Get the user's email from previous midleware
        const email = res.locals.jwtPayload.email;

        // Get user role from the database
        let user: any;
        try {
            user = await User.findOne({email: email});
        } catch (id) {
            res.status(401).send();
        }

        // Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    };
};