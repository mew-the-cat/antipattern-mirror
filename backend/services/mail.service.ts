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
            from: '"Fred Foo 👻" <' + config.username + '>',
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
                    <h1>Verifizierung deines Accounts auf _______________</h1>
                    <p style="font-size: large">
                        Hey ${user.name}!<br /> <br />
            
                        Wir sind froh, dass du dich bei uns registriert hast und ein Teil von _________ werden willst! Bevor du dich jedoch ins getümmel stürzen kannst, musst du dein Konto verifizieren.<br /> <br />
                
                        Keine Sorge, das geht ganz schnell und einfach. Alles, was du dafür tun musst, ist auf den untenstehenden Link zu klicken und den Anweisungen zu befolgen, um dein Konto zu verifizieren. Sobald du das getan hast, kannst du alle Funktionen deines Kontos nutzen.<br /> <br />
                
                        Hier ist der Link zur Verifizierung deines Kontos: <strong><a href="${process.env.REACT_APP_FRONTEND + "/registration/verification?code=" + verificationCode}">Verifizier mich!</a></strong><br /> <br />
                
                        Wenn du irgendwelche Fragen hast, zögere nicht, uns zu kontaktieren. Wir sind immer hier, um dir zu helfen.<br /> <br />
                
                        Beste Grüße,<br />
                        ________________________
                    </p>
                </div>
            `;
        }
        return `
Verifizierung deines Accounts auf _______________

Hey ${user.name}!

Wir sind froh, dass du dich bei uns registriert hast und ein Teil von _________ werden willst! Bevor du dich jedoch ins getümmel stürzen kannst, musst du dein Konto verifizieren.

Keine Sorge, das geht ganz schnell und einfach. Alles, was du dafür tun musst, ist auf den untenstehenden Link zu klicken und den Anweisungen zu befolgen, um dein Konto zu verifizieren. Sobald du das getan hast, kannst du alle Funktionen deines Kontos nutzen.

Hier ist der Link zur Verifizierung deines Kontos: ${process.env.REACT_APP_FRONTEND + "/registration/verification?code=" + verificationCode}

Wenn du irgendwelche Fragen hast, zögere nicht, uns zu kontaktieren. Wir sind immer hier, um dir zu helfen.

Beste Grüße,
________________________
        `;
    }

    static createPasswordResetMail(user: User, recoveryCode: string, recoveryNumber: string, html: boolean): string {

        if(html) {
            return `
                <img src="https://via.placeholder.com/600x100?text=Banner" width="100%" alt="Banner" />
                <div style="padding: 15px">
                    <h1>Zurücksetzen deines Passworts auf _______________</h1>
                    <p style="font-size: large">
                        Hallo ${user.name},<br /><br />
    
                        wir haben bemerkt, dass du dein Passwort für deinen _________ Account vergessen hast. Keine Sorge, wir haben das im Griff und helfen dir gerne weiter!<br /><br />
                        
                        Klicke einfach auf den folgenden Link, um dein Passwort zurückzusetzen: <strong><a href="${process.env.REACT_APP_FRONTEND + "/password/reset?code=" + recoveryCode}">Klick mich</a></strong><br /><br />
                        
                        Du wirst dann auf eine Seite weitergeleitet, auf der du einen Sicherheitscode eingeben musst. Dieser Code wurde dir ebenfalls in dieser E-Mail zugeschickt und ist nur für dich bestimmt. Wenn du ihn eingegeben hast, kannst du dein neues Passwort erstellen und dich wieder in deinen Account einloggen.<br /><br />
                        
                        Code zum Zurücksetzen deines Passworts: <strong>${recoveryNumber}</strong><br /><br />
                        
                        Und wenn du dich fragst, wie du dein Passwort vergessen konntest, keine Sorge, es passiert den Besten von uns! Aber jetzt ist es Zeit, dein Passwort zurückzusetzen und wieder durchzustarten.<br /><br />
                        
                        Wir hoffen, dass dir dieser Vorgang einfach und problemlos gelingt. Wenn du jedoch Hilfe benötigst, zögere nicht, uns jederzeit zu kontaktieren.<br /><br />
                        
                        Viele Grüße,<br />
                        ____________
                    </p>
                </div>
            `;
        }

        return `
Zurücksetzen deines Passworts auf _______________

Hallo ${user.name},

wir haben bemerkt, dass du dein Passwort für deinen _________ Account vergessen hast. Keine Sorge, wir haben das im Griff und helfen dir gerne weiter!

Klicke einfach auf den folgenden Link, um dein Passwort zurückzusetzen: ${process.env.REACT_APP_FRONTEND + "/password/reset?code=" + recoveryCode}

Du wirst dann auf eine Seite weitergeleitet, auf der du einen Sicherheitscode eingeben musst. Dieser Code wurde dir ebenfalls in dieser E-Mail zugeschickt und ist nur für dich bestimmt. Wenn du ihn eingegeben hast, kannst du dein neues Passwort erstellen und dich wieder in deinen Account einloggen.

Code zum Zurücksetzen deines Passworts: ${recoveryNumber}

Und wenn du dich fragst, wie du dein Passwort vergessen konntest, keine Sorge, es passiert den Besten von uns! Aber jetzt ist es Zeit, dein Passwort zurückzusetzen und wieder durchzustarten.

Wir hoffen, dass dir dieser Vorgang einfach und problemlos gelingt. Wenn du jedoch Hilfe benötigst, zögere nicht, uns jederzeit zu kontaktieren.

Viele Grüße,
____________
        `;

    }

    static createDeletionMail(user: User, forfeitCode: string, forfeitNumber: string, html: boolean): string {

        if(html) {
            return `
                <img src="https://via.placeholder.com/600x100?text=Banner" width="100%" alt="Banner" />
                <div style="padding: 15px">
                    <h1>Löschen deines Accounts auf _______________</h1>
                    <p style="font-size: large">
                        Hey ${user.name}, <br /><br />
            
                        wir haben deine Nachricht erhalten und es tut uns wirklich leid zu hören, dass du deinen Account bei uns löschen möchtest. Du hast sicher deine Gründe! Dennoch sind wir traurig, zumindest deinen Account zu verlieren und hoffen, dich dennoch als Kunden behalten zu können. <br /><br />
                        
                        Wenn du wirklich entschieden hast, dass du deinen Account löschen möchtest, dann haben wir für dich einen einfachen Prozess bereitgestellt. Folge einfach diesem Link <strong><a href="${"http://127.0.0.1:3000/user/account/delete/" + forfeitCode}">Account löschen</a></strong> und gib den folgenden Code ein: <strong>${forfeitNumber}</strong> <br /><br />
                        
                        Bevor du den Löschungsprozess startest, möchten wir sicherstellen, dass du diese Entscheidung bewusst triffst. Solltest du uns Feedback geben wollen oder falls wir etwas verbessern können, sind wir gerne für dich da. Schreib uns einfach eine E-Mail an [E-MAIL EINFÜGEN] und wir werden uns umgehend bei dir melden.<br /><br />
                        
                        Wir möchten uns für die Zeit bedanken, die du mit uns verbracht hast und hoffen, dass wir uns in Zukunft wiedersehen werden.<br /><br />
                        
                        Viele Grüße,<br />
                        ________________
                    </p>
                </div>
            `;
        }

        return `
Löschen deines Accounts auf _______________

Hey ${user.name},

wir haben deine Nachricht erhalten und es tut uns wirklich leid zu hören, dass du deinen Account bei uns löschen möchtest. Du hast sicher deine Gründe! Dennoch sind wir traurig, zumindest deinen Account zu verlieren und hoffen, dich dennoch als Kunden behalten zu können.

Wenn du wirklich entschieden hast, dass du deinen Account löschen möchtest, dann haben wir für dich einen einfachen Prozess bereitgestellt. Folge einfach diesem Link http://127.0.0.1:3000/user/account/delete/${forfeitCode} und gib den folgenden Code ein: ${forfeitNumber}

Bevor du den Löschungsprozess startest, möchten wir sicherstellen, dass du diese Entscheidung bewusst triffst. Solltest du uns Feedback geben wollen oder falls wir etwas verbessern können, sind wir gerne für dich da. Schreib uns einfach eine E-Mail an [E-MAIL EINFÜGEN] und wir werden uns umgehend bei dir melden.

Wir möchten uns für die Zeit bedanken, die du mit uns verbracht hast und hoffen, dass wir uns in Zukunft wiedersehen werden.

Viele Grüße,
________________
        `;
    }
}