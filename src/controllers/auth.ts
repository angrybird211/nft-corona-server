/**
 * Auth Controller
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import Mailer from '../helper/mailer';
import User from '../models/user';

const { Token } = require("../models/Token");
var uuid = require('uuid');

class AuthController {


    /**
     * Login Handler
     * 
     * @param req Request
     * @param res Response
     */
    public async login(req: Request, res: Response) {
        let { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).json({ msg: 'Email and password are required' });
        }

        let user: any;

        try {
            user = await User.findOne({
                email: email,
                password: password
            });
        } catch (error) {
            console.log("login has an error: ", error);
            res.status(401).json({
                msg: 'Login error'
            });
        }

        if (!user) {
            res.status(400).json({
                msg: 'Incorrect password'
            });
        }
        console.log("user login info is: ", user);

        const token = jwt.sign({
            email: user.email,
            password: user.password,
            role: user.role,
            avatar: user.avatar,
            userName: user.firstName + ' ' + user.lastName,
            id: user.id
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1h'
        });

        res.status(200).json({
            success: true,
            token: token
        });
    }



    /**
     * Forget password handler
     * 
     * @param req Request
     * @param res Response
     */
    public async forgotPassword(req: Request, res: Response) {
        let { email } = req.body;

        let user: any;
        try {
            user = User.findOne({ email: email });
        } catch (error) {
            console.log("User does not exist: ", error);
            res.status(404).send({
                msg: 'User not found'
            });
        }

        let host = "locatlhost:3000";

        const mailToken = new Token({
            _userId: user._id,
            token: uuid.v1("hex"),
        });

        const mailer = new Mailer({
            to: 'stevean0205@gmail.com',
            from: 'sharpeye211@gmail.com',
            subject: 'Reset password',
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n
                <a href="http://${host}/login/reset/${mailToken.token}">http://${host}/login/reset/${mailToken.token}</a> \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`,
        });

        mailer.send();

        res.status(200).json({
            msg: 'We sent you a link to reset password. Please check your inbox'
        })
    }
}

export default AuthController;