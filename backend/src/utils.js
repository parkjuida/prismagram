import { adjectives, nouns } from "./words"
import sgMail from "@sendgrid/mail"
import jwt from "jsonwebtoken";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const generateSecret = () => {
    const adjectives_index = Math.floor(Math.random() * adjectives.length)
    const nouns_index = Math.floor(Math.random() * adjectives.length)
    return `${adjectives[adjectives_index]} ${nouns[nouns_index]}`
}

const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    
    return sgMail.send(email)
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "no-reply@parkjuida.com",
        to: address,
        subject: "Login secrets...",
        html: `Hello! your login secret. <b>${secret}</b><br/>Copy paste on the app or website.`,
    }
    return sendMail(email);
}

export const generateToken = (id) => {
    console.log("generate token");
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
