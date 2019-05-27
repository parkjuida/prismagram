import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils"


export default {
    Mutation: {
        requestSecret: async(_, args, {request}) => {
            const { email } = args;
            const secret = generateSecret();
            try {
                await prisma.updateUser({
                    data: {
                        loginSecret: secret,
                    },
                    where: {
                        email: email,
                    }
                });
                await sendSecretMail(email, secret);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}