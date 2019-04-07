import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils"


export default {
    Mutation: {
        requestSecret: async(_, args, {request}) => {
            console.log(request.user)
            throw Error();
            const { email } = args;
            const secret = generateSecret();
            console.log(secret);
            try {
                await sendSecretMail(email, secret)
                await prisma.updateUser({
                    data: {
                        loginSecret: secret,
                    },
                    where: {
                        email: email,
                    }
                });
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
            sendSecretMail(email, secret);
        }
    }
}