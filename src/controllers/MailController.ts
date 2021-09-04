import {NextFunction, Request, Response} from "express";
import nodemailer from "nodemailer";

export default class MailController {

    async sendMail(request: Request, response: Response, next: NextFunction) {
        // var transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true,
        //     socketTimeout: 10000,
        //     auth: {
        //         user: 'chienchang0822@gmail.com',
        //         pass: 'ciombuaulgogqqgc',
        //     },
        // });

        var transporter = nodemailer.createTransport({
            host: 'smtp1.liontravel.com',
            port: 25,
            secure: false,
            socketTimeout: 10000
        });

        var mailOptions = {
            from: 'victorkung@liontravel.com',
            to: 'chienchang0822@gmail.com',
            subject: 'Hello!',
            html: "<strong>Hello world?</strong>"
        };
        var res = transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent:' + info);
            }
            transporter.close();
        });
        return res;
    }

}