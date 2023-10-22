import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {User} from "../database/models/user.model";
import dayjs from "dayjs";

const env = process.env.NODE_ENV || 'development';
const config = require('../../database/config/email.config.json')[env];

const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: false,
    auth: {
        user: config.username,
        pass: config.password
    }
});

export class Mail {
    static send(to: string | undefined, subject: string | undefined, text: string | undefined, html: string | undefined): Promise<SMTPTransport.SentMessageInfo> {
        return transporter.sendMail({
            from: 'FinTwin',
            to: to,
            subject: subject,
            text: text,
            html: html
        });
    }

    static createVerificationMail(user: User, verificationCode: string, html: boolean): string {
        if(html) {
            return `
                <img src="https://via.placeholder.com/600x100?text=Banner" width="100%" alt="Banner" />
                <div style="padding: 15px">
                    <h1>Verifying your Account on _______________</h1>
<p style="font-size: large">
    Hey ${user.firstname}!<br /> <br />

    We're glad you've registered with us and want to become a part of _________! However, before you can dive in, you need to verify your account.<br /> <br />

    Don't worry, it's quick and easy. All you have to do is click the link below and follow the instructions to verify your account. Once you've done that, you can use all the features of your account.<br /> <br />

    Here's the link to verify your account: <strong><a href="${process.env.REACT_APP_FRONTEND + "/registration/verification?code=" + verificationCode}">Verify me!</a></strong><br /> <br />

    If you have any questions, don't hesitate to contact us. We're always here to help.<br /> <br />

    Best regards,<br />
    ________________________
</p>

                </div>
            `;
        }
        return `
Verifying your Account on _______________

Hey ${user.firstname}!

We're glad you've registered with us and want to become a part of _________! However, before you can dive in, you need to verify your account.

Don't worry, it's quick and easy. All you have to do is click the link below and follow the instructions to verify your account. Once you've done that, you can use all the features of your account.

Here's the link to verify your account: ${process.env.REACT_APP_FRONTEND + "/registration/verification?code=" + verificationCode}

If you have any questions, don't hesitate to contact us. We're always here to help.

Best regards,
________________________
`;

    }

    static createPasswordResetMail(user: User, recoveryCode: string, recoveryNumber: string, html: boolean): string {

        if(html) {
            return `
                <img src="https://via.placeholder.com/600x100?text=Banner" width="100%" alt="Banner" />
                <div style="padding: 15px">
                    <h1>Resetting Your Password on _______________</h1>
<p style="font-size: large">
    Hello ${user.firstname},<br /><br />

    we noticed you forgot your password for your _________ account. Don't worry, we've got this covered and are here to help!<br /><br />

    Simply click on the following link to reset your password: <strong><a href="${process.env.REACT_APP_FRONTEND + "/password/reset?code=" + recoveryCode}">Click me</a></strong><br /><br />

    You'll be redirected to a page where you'll need to enter a security code. This code has also been sent to you in this email and is meant just for you. Once you've entered it, you can set your new password and log back into your account.<br /><br />

    Code to reset your password: <strong>${recoveryNumber}</strong><br /><br />

    And if you're wondering how you could've forgotten your password, don't fret, it happens to the best of us! But now, it's time to reset your password and get back on track.<br /><br />

    We hope this process is easy and seamless for you. However, if you need assistance, don't hesitate to contact us at any time.<br /><br />

    Warm regards,<br />
    ____________
</p>

                </div>
            `;
        }

        return `
Resetting Your Password on _______________

Hello ${user.firstname},

we noticed you forgot your password for your _________ account. Don't worry, we've got this covered and are here to help!

Simply click on the following link to reset your password: ${process.env.REACT_APP_FRONTEND + "/password/reset?code=" + recoveryCode}

You'll be redirected to a page where you'll need to enter a security code. This code has also been sent to you in this email and is meant just for you. Once you've entered it, you can set your new password and log back into your account.

Code to reset your password: ${recoveryNumber}

And if you're wondering how you could've forgotten your password, don't fret, it happens to the best of us! But now, it's time to reset your password and get back on track.

We hope this process is easy and seamless for you. However, if you need assistance, don't hesitate to contact us at any time.

Warm regards,
____________
`;


    }

    static createDeletionMail(user: User, forfeitCode: string, forfeitNumber: string, html: boolean): string {

        if(html) {
            return `
                <img src="https://via.placeholder.com/600x100?text=Banner" width="100%" alt="Banner" />
                <div style="padding: 15px">
                    <h1>Deleting Your Account on _______________</h1>
<p style="font-size: large">
    Hey ${user.firstname}, <br /><br />

    we've received your message and are genuinely sorry to hear that you wish to delete your account with us. You surely have your reasons! Nevertheless, we're sad to at least lose your account and hope we can still retain you as a customer. <br /><br />
    
    If you've truly decided that you want to delete your account, we've set up a straightforward process for you. Simply follow this link <strong><a href="${"http://127.0.0.1:3000/user/account/delete/" + forfeitCode}">Delete Account</a></strong> and enter the following code: <strong>${forfeitNumber}</strong> <br /><br />
    
    Before you initiate the deletion process, we want to ensure that you're making this decision consciously. If you'd like to provide us with feedback or think there's something we can improve upon, we're here for you. Just send us an email at [INSERT EMAIL] and we'll get back to you promptly.<br /><br />
    
    We'd like to thank you for the time you've spent with us and hope that we'll see you again in the future.<br /><br />
    
    Warm regards,<br />
    ________________
</p>

                </div>
            `;
        }

        return `
Deleting Your Account on _______________

Hey ${user.firstname},

We've received your message and are genuinely sorry to hear that you wish to delete your account with us. You surely have your reasons! Nevertheless, we're sad to at least lose your account and hope to still retain you as a customer.

If you've truly decided that you want to delete your account, we've set up a straightforward process for you. Simply follow this link http://127.0.0.1:3000/user/account/delete/${forfeitCode} and enter the following code: ${forfeitNumber}

Before you initiate the deletion process, we want to ensure that you're making this decision consciously. If you'd like to provide us with feedback or think there's something we can improve upon, we're here for you. Just send us an email at [INSERT EMAIL] and we'll get back to you promptly.

We'd like to thank you for the time you've spent with us and hope that we'll see you again in the future.

Warm regards,
________________
`;

    }
}