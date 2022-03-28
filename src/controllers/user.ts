/**
 * User Controller
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

import express, { Request, Response } from 'express';
import User from '../models/user';

class UserController {

    /**
     * Register handler
     * 
     * @param req Request
     * @param res Response
     */
    public async create(req: Request, res: Response) {
        let user: any = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ msg: "User already exists with an email" })
        } else {
            let { firstName, lastName, email, password, password2 } = req.body;

            if (!(password !== password2)) {
                res.status(400).json({ msg: 'Your passwords are not match.' });
            }

            let newUser = new User({
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email,
                createdAt: new Date(),
            });

            newUser.save()
                .then((user: any) => {
                    return res.status(200).json({
                        msg: "success",
                        user: user
                    });
                })
                .catch((error: any) => {
                    console.log("Registering a new user has an error", error);
                    return res.status(500).json({ msg: "Internal Server Error" });
                })
        }
    }


    /**
     * Get User List
     * 
     * @param req Request
     * @param res Response
     */
    public async list(req: Request, res: Response) {
        let users: any;
        try {
            users = await User.find().sort('-createdAt').populate('category', 'name');
        } catch (error) {
            console.log("Getting all users has an error", error);
            res.status(400).json({
                msg: 'Server is under maintaining. Please try again later'
            });
        }
        console.log("users are", users);

        res.status(200).json(users);
    }


    /**
     * Get a user by id
     * 
     * @param req Request
     * @param res Response
     */
    public async userById(req: Request, res: Response) {
        // Get the id from the url
        const id: string = req.params.id;
        let user: any;

        try {
            user = await User.findById(id).populate('category', 'name');
        } catch (error) {
            console.log("Getting an user has an error", error);
            res.status(404).json({
                msg: 'User not found'
            });
        }

        res.status(200).json(user);
    }


    /**
     * Delete a user with id
     * 
     * @param req Request
     * @param res Response
     */
    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        let user: any;
        try {
            user = await User.findById(id);
        } catch (error) {
            console.log("Getting an user has an error: ", error);
            res.status(400).json({
                msg: 'Server is under maintaining'
            });
        }

        user.remove((error: any) => {
            if (error) {
                return res.status(400).send({
                    msg: "Server is under maintaining"
                });
            } else {
                res.json(user);
            }
        })
    }


    public async update(req: Request, res: Response) {
        // Get the id from the url
        const id = req.params.id;
        let data = req.body;

        let user: any;

        /*****************************
         * Add logic to update user here
         */

        try {
            user = await User.findByIdAndUpdate(id, data);
        } catch (error) {
            console.log("Updating an user has an error: ", error);
            res.status(400).json({
                msg: 'Server is under maintaining'
            });
        }

        res.status(200).json(user);
    }
}

export default UserController;